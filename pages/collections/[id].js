import ArticleListContainer from "../../components/ArticleListContainer";
import styled from "styled-components";
import Link from "next/link";
import { getArticlesByCollectionId } from "../../services/articleService";
import Button from "../../components/Button";
import { getCollectionById } from "../../services/collectionService";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const articles = await getArticlesByCollectionId(id);
  const collection = await getCollectionById(id);

  return {
    props: {
      collectionId: id,
      articles: articles,
      collectionName: collection.name,
    },
  };
}

export default function Collection({ collectionId, articles, collectionName }) {
  return (
    <StyledSection>
      <Link href="/collections" passHref>
        <StyledButton>Back</StyledButton>
      </Link>

      <StyledH2>{collectionName}</StyledH2>

      <ArticleListContainer
        currentArticles={articles}
        collectionId={collectionId}
        delible={true}
      />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  position: relative;
`;

const StyledButton = styled(Button)`
  box-shadow: 3px 2px 3px 2px var(--line-color);
  border: var(--line-color);
  background: transparent;
`;

const StyledH2 = styled.h2`
  text-decoration: underline;
  text-underline-offset: 3px;
`;
