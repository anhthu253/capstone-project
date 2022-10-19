import ArticleListContainer from "../components/ArticleListContainer";
import { getAllArticles } from "../services/articleService";

export async function getServerSideProps() {
  const articles = await getAllArticles();

  return {
    props: { articles: articles },
  };
}
export default function Home({ articles }) {
  return (
    <>
      <ArticleListContainer articles={articles} />
    </>
  );
}
