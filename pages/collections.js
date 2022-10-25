import ArticleListContainer from "../components/ArticleListContainer";
const initialSavedArticle = [
  {
    id: "54543095",
    title: "Chaos Is as Chaos Does",
    author: "JAMES HOWARD KUNSTLER",
    description:
      "When this future becomes the present, that present will look obvious. It always does. And from that present, this past we are living in will look ridiculous…. — Curtis Yarvin It’s hard to escape the awful feeling that Western Civ has a death wish, or say whic…",
  },
];
export default function Collections() {
  return <ArticleListContainer articles={initialSavedArticle} />;
}
