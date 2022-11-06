import { useStore } from "../hooks/useStore";
import { useEffect, useState } from "react";
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
  const [selections, setSelections] = useState([]);

  function restoreHighlightRemoveEvent() {
    const spans = document.querySelectorAll(".highlight");
    spans.forEach((span) => span.addEventListener("dblclick", removeHighlight));
  }

  function isSelectionOverlap(newRange, oldRange) {
    //check if the new selection is in the same paragraphs with the previoous ones
    if (newRange.commonAncestorContainer !== oldRange.commonAncestorContainer)
      return false;

    if (
      newRange.startOffset > oldRange.startOffset &&
      newRange.startOffset < oldRange.endOffset
    )
      return true;

    if (
      newRange.endOffset > oldRange.startOffset &&
      newRange.endOffset < oldRange.endOffset
    )
      return true;

    if (
      newRange.startOffset < oldRange.startOffset &&
      newRange.endOffset > oldRange.endOffset
    )
      return true;

    return false;
  }

  //update document with highlights to database
  async function saveSelection2DB() {
    const updatedContent = document.querySelector(
      ".articleFullContent"
    ).innerHTML;
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

  function removeHighlight(event) {
    const span = event.target;
    span.classList.remove(".highlight");
    const text = span.textContent;
    span.replaceWith(text);
    setSelections((prevSels) =>
      prevSels.filter(
        (prevSel) => span.getAttribute("id") != prevSel.span.getAttribute("id")
      )
    );
  }

  function highLight(event) {
    const sel = window.getSelection();

    if (!sel) return; //if no selection
    if (sel.toString().length == 0) return;
    if (event.detail === 2) return; // double mouse click
    const range = window.getSelection().getRangeAt(0);
    if (
      range.commonAncestorContainer.tagName !== undefined &&
      range.commonAncestorContainer.tagName !== "P" &&
      range.commonAncestorContainer.tagName !== "SPAN"
    ) {
      window.alert("Selection over several paragraph is not allowed");
      return;
    }
    if (
      selections.length > 0 &&
      selections.find((prevSelection) =>
        isSelectionOverlap(range, prevSelection.range)
      )
    ) {
      window.alert("Selections should not overlap each other");
      return;
    }
    const span = document.createElement("span");
    span.classList.add("highlight");
    span.setAttribute("id", Math.random().toString(36).substring(2));
    span.style.backgroundColor = "yellow";
    span.appendChild(range.extractContents());
    range.insertNode(span);
    setSelections((prevSels) => [...prevSels, { span, range }]);

    //remove highlight by double clicking on it
    span.addEventListener("dblclick", removeHighlight);
  }

  useEffect(() => {
    const allParagraph = document.querySelectorAll("p");
    allParagraph.forEach((p) =>
      p.setAttribute("id", "text" + Math.random().toString(36).substring(2))
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
        <Link
          href={
            currentArticle.isSaved
              ? `/collections/${currentArticle.collectionId}`
              : "/"
          }
        >
          <StyledButton>Back</StyledButton>
        </Link>

        {selections.length > 0 && currentArticle.isSaved && (
          <StyledButton onClick={saveSelection2DB}>
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
