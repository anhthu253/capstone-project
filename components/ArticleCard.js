import styled from "styled-components";
import { useRouter } from "next/router";

export default function ArticleCard({
  id,
  url,
  urlToImage,
  title,
  author,
  description,
  message,
  alert,
}) {
  const router = useRouter();

  async function getFullContent() {
    const response = await fetch(`/api/search/${id}`, {
      method: "POST",
      body: JSON.stringify({ url: url }),
    });

    const data = await response.json();
    localStorage.setItem("article", JSON.stringify({ fullcontent: data }));
    router.push(`/${id}`);
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
          <article>
            <img
              src={urlToImage}
              alt="article image"
              width="250"
              height="150"
            ></img>
          </article>

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
