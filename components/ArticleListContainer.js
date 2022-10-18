import styled from "styled-components";
import ArticleCard from "./ArticleCard";
import { useState } from "react";

const initialArticles = [
  {
    id: "24343",
    imageUrl: "/images/image-item1.jpg",
    text: "rgasgsdfasdfdsfgasdfsadfagsdrtreterwtrewtfasdfasdfdsgasgadga",
  },
  {
    id: "6454",
    imageUrl: "/images/image-item2.jpg",
    text: "nghsdgdfgdfagadsgfrtzt4etrewtertrewt4e64etzrehgsdrgdgdfsgdsfgdbfhrtehrhgrt",
  },
  {
    id: "5466",
    imageUrl: "/images/image-item4.jpg",
    text: "bfdbadrgraegret4e6tr tztrze5rzterwterwterwteregradhraezrez",
  },
];

export default function ArticleListContainer({ className }) {
  const [articles, setArticles] = useState(initialArticles);

  console.log("hey", articles);
  return (
    <StyledListContainer className={className}>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article}></ArticleCard>
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
`;
