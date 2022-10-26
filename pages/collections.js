import ArticleListContainer from "../components/ArticleListContainer";
import { useStore } from "../hooks/useStore";
import styled from "styled-components";
import Link from "next/link";
export default function Collections() {
  const collections = useStore((state) => state.collections);
  return (
    <StyledSection>
      <Link href="/" passHref>
        <StyledButton>Back</StyledButton>
      </Link>
      <ArticleListContainer articles={collections} />
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
