import { useStore } from "../hooks/useStore";
import { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import Link from "next/link";
import PopupMenu from "../components/PopupMenu";
import { getAllCollections } from "../services/collectionService";
import Button from "../components/Button";

export async function getServerSideProps() {
  const currentCollections = await getAllCollections();

  return {
    props: {
      currentCollections,
    },
  };
}

export default function Content({ currentCollections }) {
  const currentArticle = useStore((state) => state.currentArticle);
  const [popUp, setPopUp] = useState(false);
  const contentRef = useRef();

  function restoreHighlightRemoveEvent() {
    const spans = document.querySelectorAll(".highlight");
    spans.forEach((span) => span.addEventListener("dblclick", removeHighlight));
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
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  //check which paragraph  is the node's ancestor
  function whichParagraph(node) {
    if (!node.id) return "";
    if (node.id.startsWith("text")) return node.id;
    return whichParagraph(node?.parentNode);
  }
  function removeHighlight(event) {
    const span = event.target;
    const parent = span.parentNode;
    parent.innerHTML = parent?.innerHTML.replace(
      span.outerHTML,
      span.innerHTML
    );
  }

  function highLight(event) {
    const selection = window.getSelection();
    if (!selection) return; //if no selection
    if (selection.toString().length === 0) return;
    if (event.detail === 2) return; // double mouse click

    const range = selection.getRangeAt(0);

    const pStartContainerId = whichParagraph(range.startContainer.parentNode);
    const pEndContainerId = whichParagraph(range.endContainer.parentNode);
    if (
      (pStartContainerId !== pEndContainerId &&
        pStartContainerId !== "" &&
        pEndContainerId !== "") ||
      (pStartContainerId === pEndContainerId && pEndContainerId === "")
    ) {
      window.alert("Selection over several paragraph is not allowed");
      return;
    }

    const childrenArray = [...event.target.children] || [];
    if (childrenArray.find((node) => node.className === "highlight")) {
      window.alert(
        "Only one selection is allowed in a paragraph. Please remove the last one first before making another selection"
      );
      return;
    }

    const span = document.createElement("span");
    span.classList.add("highlight");
    span.style.backgroundColor = "yellow";
    span.appendChild(range.extractContents());
    range.insertNode(span);

    //remove highlight by double clicking on it
    span.addEventListener("dblclick", removeHighlight);
  }

  useEffect(() => {
    const allParagraphs = document.querySelectorAll("p");
    allParagraphs.forEach((p) => {
      p.setAttribute("id", "text" + Math.random().toString(36).substring(2));
      const pChildren = [...p.children] || [];
      pChildren.forEach((pChild) =>
        pChild.setAttribute("id", Math.random().toString(36).substring(2))
      );
    });
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
        <Link
          href={
            currentArticle.isSaved
              ? `/collections/${currentArticle.collectionId}`
              : "/"
          }
        >
          <StyledButton>Back</StyledButton>
        </Link>

        {currentArticle.isSaved && (
          <StyledButton onClick={saveSelectionToDB}>
            Save highlights
          </StyledButton>
        )}
        {!currentArticle.isSaved && (
          <StyledIcon
            icon="entypo:dots-three-vertical"
            onClick={() => {
              setPopUp((popup) => !popup);
            }}
          />
        )}
        <h3>{currentArticle.title}</h3>
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
  opacity: ${({ blur }) => (blur ? 0.2 : 1)};
`;

const StyledContent = styled.div`
  margin-top: 1rem;
  & img {
    width: 250px;
    height: auto;
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  box-shadow: 3px 2px 3px 2px var(--line-color);
  border: var(--line-color);
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`;
