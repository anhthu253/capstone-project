import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ArticleCard({ text }) {
  const router = useRouter();
  return (
    <StyledCard onClick={() => router.push("/content")}>{text}</StyledCard>
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
