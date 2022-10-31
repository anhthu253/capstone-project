import ArticleListContainer from "../../components/ArticleListContainer";
import styled from "styled-components";
import Link from "next/link";
import { getArticlesByCollectionId } from "../../services/articleService";
import Button from "../../components/Button";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const collection = await getArticlesByCollectionId(id);

  return {
    props: {
      collection,
    },
  };
}

export default function Collection({ collection }) {
  return (
    <StyledSection>
      <Link href="/collections" passHref>
        <StyledButton>Back</StyledButton>
      </Link>
      {collection.length > 0 && (
        <StyledH2>{collection[0].collectionName}</StyledH2>
      )}
      <ArticleListContainer currentArticles={collection} delible={true} />
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
