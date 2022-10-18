import { getArticlesById } from "../services/articleService";
import Content from "../components/Content";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const article = await getArticlesById(id);
  return {
    props: { ...article },
  };
}

export default function Article(article) {
  const router = useRouter();
  return (
    <Content
      text={article.text}
      goBack={() => {
        router.push("/");
      }}
    />
  );
}
