import ArticleListContainer from "../../components/ArticleListContainer";
import styled from "styled-components";
import Link from "next/link";
import { useStore } from "../../hooks/useStore";
export default function Collection() {
  const currentCollection = useStore((state) => state.currentCollection);
  console.log("current collection", currentCollection.articles);
  return (
    <StyledSection>
      <Link href="/collections" passHref>
        <StyledButton>Back</StyledButton>
      </Link>
      <ArticleListContainer articles={currentCollection.articles} />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  position: relative;
`;

const StyledButton = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
  background: var(--background-primary);
  box-shadow: 3px 2px 3px 2px var(--line-color);
  border: var(--line-color);
`;
