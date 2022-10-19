import styled from "styled-components";
import ArticleCard from "./ArticleCard";

export default function ArticleListContainer({ articles }) {
  return (
    <StyledListContainer>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
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
