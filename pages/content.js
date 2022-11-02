import { useStore } from "../hooks/useStore";
import { useState } from "react";
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
        <Link href={currentArticle.isSaved ? `/collections` : "/"}>
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
          dangerouslySetInnerHTML={{ __html: currentArticle.fullContent }}
        ></StyledContent>
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
