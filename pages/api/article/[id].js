import dbConnect from "../../../lib/dbConnect";
import FavouriteArticle from "../../../models/FavouriteArticle";
import { getSelectionsPerArticle } from "../../../services/articleService";
export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();
  switch (request.method) {
    case "GET":
      const selectionsPerArticles = await getSelectionsPerArticle(id);
      return response.status(200).json(selectionsPerArticles);
    case "DELETE":
      await FavouriteArticle.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ message: "Article deleted", deletedId: id });
    case "PUT":
      const article = JSON.parse(request.body);
      await FavouriteArticle.findByIdAndUpdate(
        { _id: id },
        { fullContent: article.fullContent, selections: article.selections }
      );
      return response
        .status(200)
        .json({ message: "Article updated", updatedId: id });
    default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
