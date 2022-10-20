import {
  getArticlesBy,
  getArticlesByKeywords,
} from "../../../services/articleService";
export default async function handler(request, response) {
  const { thema, source, when, country } = request.query;
  if (request.method === "GET") {
    const data = await getArticlesByKeywords(thema, source, when, country);
    if (data === undefined)
      return response.status(404).json({ message: "article not found" });
    return response.status(200).json(data);
  }
  response.status(403).json({ message: "Error: request method not allowed." });
}
