import dbConnect from "../../../lib/dbConnect";
import FavouriteArticle from "../../../models/FavouriteArticle";
export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();
  switch (request.method) {
    case "DELETE":
      await FavouriteArticle.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ message: "Article deleted", deletedId: id });
    case "PUT":
      const article = JSON.parse(request.body);
      await FavouriteArticle.findByIdAndUpdate(
        { _id: article.id },
        { fullContent: article.fullContent }
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
