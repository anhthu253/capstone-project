import styled from "styled-components";
import { useRouter } from "next/router";
import { useStore } from "../hooks/useStore";
import { Icon } from "@iconify/react";

export default function ArticleCard({ article, delible, onDelete }) {
  const { url, urlToImage, title, author, description, message, alert } =
    article;
  const router = useRouter();
  const setCurrentArticle = useStore((state) => state.setCurrentArticle);
  async function getFullContent() {
    if (!article.isSaved) {
      try {
        const response = await fetch(`/api/search/article?url=${url}`);
        const data = await response.json();
        setCurrentArticle({
          ...article,
          fullContent: data,
          isSaved: false,
        });
      } catch (error) {
        console.error(error);
      }
    } else setCurrentArticle(article);
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
          {delible && (
            <StyledIcon
              icon="akar-icons:chat-remove"
              width="25"
              onClick={onDelete}
            />
          )}
          <img
            src={urlToImage}
            alt="article image"
            width="250"
            height="150"
          ></img>

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

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;
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
  position: relative;
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
