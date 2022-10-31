import dbConnect from "../../../lib/dbConnect";
import FavouriteArticle from "../../../models/FavouriteArticle";
import { getAllFavouriteArticles } from "../../../services/articleService";
export default async function handler(request, response) {
  await dbConnect();
  switch (request.method) {
    case "GET":
      const allFavArticles = await getAllFavouriteArticles();
      return response.status(200).json(allFavArticles);
    case "PUT":
      const article = JSON.parse(request.body);
      const {
        url,
        urlToImage,
        title,
        author,
        description,
        fullContent,
        collectionId,
      } = article;

      const newFavArticle = await FavouriteArticle.findOneAndUpdate(
        {
          title: title,
          url: url,
        },
        {
          urlToImage: urlToImage,
          author: author,
          description: description,
          fullContent: fullContent,
          collectionId: collectionId,
        },
        { new: true, upsert: true }
      );

      return response
        .status(201)
        .json({ message: "Article saved", createdId: newFavArticle.id });

    default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
