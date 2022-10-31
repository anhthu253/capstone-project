import styled from "styled-components";
import ArticleCard from "./ArticleCard";
import { useState } from "react";

export default function ArticleListContainer({ currentArticles, delible }) {
  const [articles, setArticles] = useState(currentArticles);
  async function deleteArticle(articleId) {
    try {
      const response = await fetch(`/api/article/${articleId}`, {
        method: "DELETE",
      });
      reloadArticles();
    } catch (error) {
      console.error(error);
    }
  }

  async function reloadArticles() {
    try {
      const response = await fetch(`/api/article`);
      const favArticles = await response.json();
      setArticles(favArticles);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <StyledListContainer>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          delible={delible}
          onDelete={() => deleteArticle(article.id)}
        />
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
