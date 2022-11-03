import { useStore } from "../hooks/useStore";
import { useState } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import Link from "next/link";
import PopupMenu from "../components/PopupMenu";
import { getAllCollections } from "../services/collectionService";
import Button from "../components/Button";
import SelectableText from "react-selectable-text";

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

  function highLight(event) {
    if (!window.getSelection) return; //if no selection
    if (window.getSelection().toString().length == 0) return;
    if (event.detail === 2) return; // double mouse click
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement("span");
    span.classList.add(".highlight");
    span.style.backgroundColor = "#FFFF00";
    span.appendChild(range.extractContents());
    range.insertNode(span);

    //remove highlight by double clicking on it
    span.addEventListener("dblclick", (event) => {
      span.style.userSelect = "none";
      span.classList.remove(".highlight");
      span.style.backgroundColor = "transparent";
    });
  }

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
          href={currentArticle.isSaved ? `/collections/${collectionId}` : "/"}
        >
          <StyledButton>Back</StyledButton>
        </Link>

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
`;
