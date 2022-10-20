import ArticleListContainer from "../components/ArticleListContainer";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [articles, setArticles] = useLocalStorage("articles", []);

  return (
    <>
      <ArticleListContainer articles={articles} />
    </>
  );
}
