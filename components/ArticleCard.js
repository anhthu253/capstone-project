import styled from "styled-components";
import Image from "next/image";

export default function ArticleCard({ text, showContent }) {
  return <StyledCard onClick={showContent}>{text}</StyledCard>;
}

const StyledCard = styled.section`
  width: 400px;
  height: 400px;
  border: var(--line-secondary);
  &:hover {
    cursor: pointer;
  }
`;
