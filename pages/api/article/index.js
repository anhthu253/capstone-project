import dbConnect from "../../../lib/dbConnect";
import FavouriteArticle from "../../../models/FavouriteArticle";
export default async function handler(request, response) {
  if (request.method === "POST") {
    await dbConnect();
    const article = JSON.parse(request.body);
    //const newFavArticle = await FavouriteArticle.create(article);
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
  }
  return response.status(405).json({ message: "HTTP method is not allowed" });
}
