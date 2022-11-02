import dbConnect from "../lib/dbConnect";
import FavouriteArticle from "../models/FavouriteArticle";

export async function getAllFavouriteArticles() {
  await dbConnect();

  const favArticles = await FavouriteArticle.find();

  const sanitizedFavArticles = favArticles.map((favArticle) => ({
    id: favArticle.id,
    title: favArticle.title,
    author: favArticle.author,
    description: favArticle.description,
    fullContent: favArticle.fullContent,
    url: favArticle.url,
    urlToImage: favArticle.urlToImage,
    collectionId: favArticle.collectionId,
  }));

  return sanitizedFavArticles;
}

export async function getArticlesByCollectionId(id) {
  await dbConnect();

  const articles = await FavouriteArticle.find({ collectionId: id }).populate(
    "collectionId",
    "name"
  );

  const sanitizedArticlesByColId = articles.map((article) => ({
    id: article.id,
    title: article.title,
    description: article.description,
    fullContent: article.fullContent,
    url: article.url,
    urlToImage: article.urlToImage,
    isSaved: true,
    collectionId: article.collectionId.id.toString(),
    collectionName: article.collectionId.name,
  }));

  return sanitizedArticlesByColId;
}
