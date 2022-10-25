import ArticleListContainer from "../components/ArticleListContainer";
import { useStore } from "../hooks/useStore";

export default function Home() {
  const articles = useStore((state) => state.articles);

  return <ArticleListContainer articles={articles} />;
}
