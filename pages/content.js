import { useStore } from "../hooks/useStore";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import PopupMenu from "../components/PopupMenu";
import { getAllCollections } from "../services/collectionService";
import Button from "../components/Button";
import {
  faSquareCaretLeft,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export async function getServerSideProps() {
  const currentCollections = await getAllCollections();

  return {
    props: {
      currentCollections,
    },
  };
}

export default function Content({ currentCollections }) {
  const router = useRouter();
  const currentArticle = useStore((state) => state.currentArticle);
  const [popUp, setPopUp] = useState(false);
  const [selections, setSelections] = useState([]);
  const contentRef = useRef();

  function restoreHighlightRemoveEvent() {
    const spans = document.querySelectorAll(".highlight");
    spans.forEach((span) => span.addEventListener("dblclick", removeHighlight));
  }

  async function getCurrentSelectionsFromDB() {
    try {
      const response = await fetch(`/api/article/${currentArticle.id}`);
      const selectionFromDB = await response.json();
      setSelections(selectionFromDB);
    } catch (error) {
      console.error(error);
    }
  }

  //update document with highlights to database
  async function saveSelectionToDB() {
    const updatedContent = contentRef.current.innerHTML;
    try {
      const response = await fetch(`/api/article/${currentArticle.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...currentArticle,
          fullContent: updatedContent,
          selections: selections,
          //selections: selections,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  //check which paragraph  is the node's ancestor
  function whichParagraph(node) {
    if (!node) return null;
    if (node.tagName.startsWith("H")) return node;
    if (node.id?.startsWith("text")) return node;
    return whichParagraph(node?.parentNode);
  }

  function removeHighlight(event) {
    const span = event.target;
    const parent = span.parentNode;
    parent.innerHTML = parent?.innerHTML.replace(
      span.outerHTML,
      span.innerHTML
    );
    setSelections((prevSelections) =>
      prevSelections.filter((prevSelection) => prevSelection.id !== span.id)
    );
  }

  function highLight(event) {
    const selection = window.getSelection();

    if (!selection) return; //if no selection
    if (selection.toString().length === 0) return;
    if (event.detail === 2) return; // double mouse click

    const range = selection.getRangeAt(0);

    const pStartContainerId =
      whichParagraph(range.startContainer.parentNode) === null
        ? null
        : whichParagraph(range.startContainer.parentNode).id;
    const pEndContainerId =
      whichParagraph(range.endContainer.parentNode) === null
        ? null
        : whichParagraph(range.endContainer.parentNode).id;

    if (pStartContainerId !== pEndContainerId) {
      window.alert("Selection over several paragraph is not allowed");
      return;
    }

    const ancestorP = whichParagraph(event.target);
    const childrenArray = [...ancestorP?.children] || [];
    if (childrenArray.find((node) => node.className === "highlight")) {
      window.alert(
        "Only one selection is allowed in a paragraph. Please remove the last one first before making another selection"
      );
      return;
    }

    const span = document.createElement("span");
    const spanID = Math.random().toString(36).substring(2);
    span.setAttribute("id", spanID);
    span.classList.add("highlight");
    span.style.backgroundColor = "var(--navigation-color)";
    span.appendChild(range.extractContents());
    range.insertNode(span);
    setSelections((prevSelections) => [
      ...prevSelections,
      { id: spanID, text: span.textContent },
    ]);

    //remove highlight by double clicking on it
    span.addEventListener("dblclick", removeHighlight);
  }

  useEffect(() => {
    if (currentArticle.isSaved) getCurrentSelectionsFromDB();
    const allParagraphs = document.querySelectorAll("p");
    const allLists = document.querySelectorAll("li");
    allParagraphs.forEach((p) => {
      p.setAttribute("id", "text" + Math.random().toString(36).substring(2));
    });
    allLists.forEach((li) =>
      li.setAttribute("id", "text" + Math.random().toString(36).substring(2))
    );
    restoreHighlightRemoveEvent();
  }, []);

  return (
    <StyledMain>
      {popUp && (
        <PopupMenu
          popUp={popUp}
          setPopUp={setPopUp}
          currentCollections={currentCollections}
          article={{ ...currentArticle, isSaved: true }}
        />
      )}
      <StyledSection blur={popUp}>
        <StyledIcons>
          <Link
            href={
              currentArticle.isSaved
                ? `/collections/${currentArticle.collectionId}`
                : "/"
            }
          >
            <FontAwesomeIcon icon={faSquareCaretLeft}></FontAwesomeIcon>
          </Link>

          {!currentArticle.isSaved && (
            <FontAwesomeIcon
              icon={faFolderPlus}
              onClick={() => {
                setPopUp((popup) => !popup);
              }}
            />
          )}
        </StyledIcons>
        {currentArticle.isSaved && (
          <StyledButton onClick={saveSelectionToDB}>
            Save highlights
          </StyledButton>
        )}
        <br />
        <h2>{currentArticle.title}</h2>
        <StyledContent
          className="articleFullContent"
          ref={contentRef}
          onMouseUp={highLight}
          dangerouslySetInnerHTML={{ __html: currentArticle.fullContent }}
        />
      </StyledSection>
    </StyledMain>
  );
}

const StyledMain = styled.div`
  position: relative;
`;

const StyledSection = styled.section`
  opacity: ${({ blur }) => (blur ? 0 : 1)};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledContent = styled.article`
  & img {
    width: 300px;
    height: auto;
  }
  & p {
    margin-bottom: 1rem;
  }
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 10px;
  font-size: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: -10px;
  right: 0;
  margin: 0;
  border: none;
  color: var(--text-color);
  background: var(--navigation-color);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  &:hover {
    cursor: pointer;
  }
`;
