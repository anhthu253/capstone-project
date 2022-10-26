import { useStore } from "../hooks/useStore";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import PopupMenu from "../components/PopupMenu";
export default function Content() {
  const currentArticle = useStore((state) => state.currentArticle);
  const [popUp, setPopUp] = useState(false);

  return (
    <StyledSection>
      <Link href="/" passHref>
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

      {popUp && (
        <PopupMenu
          popUp={popUp}
          setPopUp={setPopUp}
          article={{ ...currentArticle, isSaved: true }}
        />
      )}

      <StyledContent
        dangerouslySetInnerHTML={{ __html: currentArticle.fullContent }}
      ></StyledContent>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  position: relative;
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

const StyledButton = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
  background: var(--background-primary);
  box-shadow: 3px 2px 3px 2px var(--line-color);
  border: var(--line-color);
`;
