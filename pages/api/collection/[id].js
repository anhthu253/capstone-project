import dbConnect from "../../../lib/dbConnect";
import Collection from "../../../models/Collection";
import FavouriteArticle from "../../../models/FavouriteArticle";
import { getArticlesByCollectionId } from "../../../services/articleService";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  switch (request.method) {
    case "GET":
      const collection = await getArticlesByCollectionId(id);
      return response.status(200).json(collection);
    case "DELETE":
      await Collection.findByIdAndDelete(id);
      await FavouriteArticle.find({ collectionId: id }).remove().exec();
      return response
        .status(200)
        .json({ message: "Collection deleted", deletedId: id });
    default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
