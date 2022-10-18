import initialArticles from "../lib/db";
export async function getAllArticles() {
  return initialArticles;
}
export async function getArticlesById(id) {
  return initialArticles.find((article) => article.id === id);
}
