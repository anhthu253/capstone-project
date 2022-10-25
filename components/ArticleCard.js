import styled from "styled-components";
import { useRouter } from "next/router";
import { useStore } from "../hooks/useStore";

export default function ArticleCard({ article }) {
  const { url, urlToImage, title, author, description, message, alert } =
    article;
  const router = useRouter();
  const setCurrentArticle = useStore((state) => state.setCurrentArticle);
  const currentArticle = useStore((state) => state.currentArticle);
  async function getFullContent() {
    if (!article.isSaved) {
      const response = await fetch(`/api/search/article?url=${url}`);
      const data = await response.json();
      setCurrentArticle({
        ...article,
        fullContent: data,
        isSaved: false,
      });
    }
    router.push(`/content`);
  }
  return (
    <li>
      {alert ? (
        alert === "error" ? (
          <StyledError>{message}</StyledError>
        ) : (
          <StyledWarning>{message}</StyledWarning>
        )
      ) : (
        <StyledCard>
          <div>
            <img
              src={urlToImage}
              alt="article image"
              width="250"
              height="150"
            ></img>
          </div>

          <article>
            <Title onClick={getFullContent}>{title}</Title>
            <Author>BY {author}</Author>
            <Description>{description}</Description>
          </article>
        </StyledCard>
      )}
    </li>
  );
}

const Title = styled.h3`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const Author = styled.p`
  text-transform: uppercase;
  color: var(--line-color);
`;

const Description = styled.p`
  color: var(--text-color);
`;

const StyledCard = styled.section`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  border-bottom: var(--line-secondary);
`;

const StyledError = styled.section`
  color: red;
  font-size: 14px;
  font-style: italic;
`;

const StyledWarning = styled.section`
  color: #59a5da;
  font-size: 14px;
`;
