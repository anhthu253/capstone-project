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
  width: 400px;
  height: 400px;
  border: var(--line-secondary);
  &:hover {
    cursor: pointer;
  }
`;
