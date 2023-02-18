import dbConnect from "../lib/dbConnect";
import FavouriteArticle from "../models/FavouriteArticle";

export async function getAllSelections() {
  await dbConnect();

  const allSelections = await FavouriteArticle.find(
    {},
    {selections:1}
  );
  
  let sanitizedselections = allSelections.map((selections) =>
    selections.selections.map((selection) => ({
      articleID:selections._id?.toString(),
      id: selection.id,
      text: selection.text,
    }))
  );

  sanitizedselections = sanitizedselections.flat();
  return sanitizedselections;
}

export async function getSelectionsPerArticle(id) {
  await dbConnect();

  const selections = await FavouriteArticle.findById(
    { _id: id },
    {
      _id: 0,
      selections: 1,
    }
  );

  const sanitizedselections = selections.selections.map((selection) => ({
    id: selection.id,
    text: selection.text,
  }));

  return sanitizedselections;
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
    selections: article.selections,
    url: article.url,
    urlToImage: article.urlToImage,
    isSaved: true,
    collectionId: article.collectionId.id.toString(),
    collectionName: article.collectionId.name,
  }));

  return sanitizedArticlesByColId;
}

export async function getArticleByID(id){
  await dbConnect();
  const article = await FavouriteArticle.findById(id)

  const sanitizedArticle = {
    id: article.id,
    title: article.title,
    description: article.description,
    fullContent: article.fullContent,
    selections: article.selections,
    url: article.url,
    urlToImage: article.urlToImage,
    isSaved:true,
    collectionId:article.collectionId.toString()
  }
  return sanitizedArticle
}


