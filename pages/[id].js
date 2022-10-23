import Content from "../components/Content";
import { useStore } from "../hooks/useStore";

export default function Article() {
  const article = useStore((state) => state.article);
  return (
    <Content
      content={article.fullcontent}
      goBack={() => {
        router.push("/");
      }}
    />
  );
}
