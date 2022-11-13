import ArticleListContainer from "../../components/ArticleListContainer";
import styled from "styled-components";
import Link from "next/link";
import { getArticlesByCollectionId } from "../../services/articleService";
import { getCollectionById } from "../../services/collectionService";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <StyledFontAwesomeIcon icon={faSquareCaretLeft}></StyledFontAwesomeIcon>
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

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-bottom: 10px;
  font-size: 25px;
`;
const StyledSection = styled.section`
  position: relative;
`;

const StyledH2 = styled.h2`
  width: fit-content;
  background: var(--navigation-color);
`;
