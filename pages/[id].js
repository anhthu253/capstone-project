import Content from "../components/Content";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Article() {
  const [article, setArticle] = useLocalStorage("article", {});
  return (
    <Content
      content={article.fullcontent}
      goBack={() => {
        router.push("/");
      }}
    />
  );
}
