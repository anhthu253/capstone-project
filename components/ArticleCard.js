import styled from "styled-components";
import { useRouter } from "next/router";
import { useStore } from "../hooks/useStore";
import { Icon } from "@iconify/react";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <StyledListItem>
      {alert ? (
        alert === "error" ? (
          <StyledError>{message}</StyledError>
        ) : (
          <StyledWarning>{message}</StyledWarning>
        )
      ) : (
        <StyledCard>
          {delible && (
            <StyledFontAwesomeIcon
              onClick={onDelete}
              icon={faSquareMinus}
            ></StyledFontAwesomeIcon>
          )}

          <StyledArticle>
            <img
              onClick={getFullContent}
              src={urlToImage}
              alt="article image"
              width="300"
              height="180"
            ></img>
            <Title onClick={getFullContent}>{title}</Title>
            <Author>by {author}</Author>
            <Description>{description}</Description>
          </StyledArticle>
        </StyledCard>
      )}
    </StyledListItem>
  );
}

const StyledListItem = styled.li`
  padding: 20px 0;
  border-bottom: var(--line-secondary);
  width: fit-content;
`;
const StyledIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  right: -15px;
`;

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Title = styled.h3`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const Author = styled.p`
  color: var(--line-color);
`;

const Description = styled.p`
  color: var(--text-color);
`;

const StyledCard = styled.section`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  gap: 40px;
  --border-bottom: var(--line-secondary);
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
