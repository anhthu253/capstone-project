import styled from "styled-components";
import Link from "next/link";

export default function ArticleCard({ id, text }) {
  return (
    <Link href={`/${id}`}>
      <StyledCard>{text}</StyledCard>
    </Link>
  );
}

const StyledCard = styled.section`
  width: 100%;
  height: 10rem;
  border: var(--line-secondary);
  &:hover {
    cursor: pointer;
  }
`;
