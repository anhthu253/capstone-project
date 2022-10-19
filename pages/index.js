import { useCallback } from "react";
import ArticleListContainer from "../components/ArticleListContainer";
import { useState, useEffect } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(JSON.parse(localStorage.getItem("articles")) ?? []);
  }, []);
  return (
    <>
      <ArticleListContainer articles={articles} />
    </>
  );
}
