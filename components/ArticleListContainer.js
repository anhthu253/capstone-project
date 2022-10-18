import styled from "styled-components";
import ArticleCard from "./ArticleCard";
import { useState } from "react";

export default function ArticleListContainer({
  className,
  articles,
  showArticle,
}) {
  return (
    <StyledListContainer className={className}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          {...article}
          showContent={() => showArticle(article.id)}
        ></ArticleCard>
      ))}
    </StyledListContainer>
  );
}

const StyledListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 2rem;
  list-style: none;
  padding-inline-start: 0;
  overflow-wrap: break-word;
`;
