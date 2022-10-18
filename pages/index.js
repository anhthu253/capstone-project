import Image from "next/image";
import styled from "styled-components";
import ArticleListContainer from "../components/ArticleListContainer";

export default function Home() {
  return (
    <>
      <ArticleListLayout></ArticleListLayout>
    </>
  );
}

const ArticleListLayout = styled(ArticleListContainer)`
  grid-colume: 1 / 2;
`;
