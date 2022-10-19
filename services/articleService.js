import articles from "../lib/db";
export async function getAllArticles() {
  return articles;
}
export async function getArticlesById(id) {
  return articles.find((article) => article.id === id);
}

export async function getArticlesByKeywords(thema, source, when, country) {
  return articles
    .filter((article) =>
      thema === "" ? true : article.thema.toLowerCase() === thema.toLowerCase()
    )
    .filter((article) =>
      source === ""
        ? true
        : article.source.toLowerCase() === source.toLowerCase()
    )
    .filter((article) =>
      when === "" ? true : article.when.toLowerCase() === when.toLowerCase()
    )
    .filter((article) =>
      country === ""
        ? true
        : article.country.toLowerCase() === country.toLowerCase()
    );
}
