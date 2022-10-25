import { useStore } from "../hooks/useStore";

import styled from "styled-components";
import Link from "next/link";
export default function Content({ content }) {
  const article = useStore((state) => state.currentArticle);
  return (
    <section>
      <Link href="/" passHref>
        <StyledButton>Back</StyledButton>
      </Link>
      <StyledContent
        dangerouslySetInnerHTML={{ __html: article.fullcontent }}
      ></StyledContent>
    </section>
  );
}

const StyledContent = styled.div`
  margin-top: 1rem;
  & img {
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