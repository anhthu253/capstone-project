import dbConnect from "../../../lib/dbConnect";
import FavouriteArticle from "../../../models/FavouriteArticle";
export default async function handler(request, response) {
  await dbConnect();
  switch (request.method) {
    case "PUT":
      const article = JSON.parse(request.body);
      const {
        url,
        urlToImage,
        title,
        author,
        description,
        fullContent,
        isSaved,
        collectionId,
      } = article;
      if (url!==undefined){
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
            isSaved:isSaved,
            collectionId: collectionId,
          },
          { new: true, upsert: true }
        );

        return response
          .status(201)
          .json({ message: "Article saved", createdId: newFavArticle.id });
      }
      else{
        const selections = JSON.parse(request.body);
        async function updateSelections(articleID, selections){
          await FavouriteArticle.findByIdAndUpdate(
            articleID,{selections}
          )
        }
        Object.entries(selections).forEach(([key,value])=> updateSelections(key,value))
        return response
          .status(201)
          .json({ message: "selections updated"});
      }
      
    default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
