import mongoose from "mongoose";
const { Schema } = mongoose;

const favouriteArticleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  description: { type: String, required: true },
  fullContent: { type: String, required: false },
  url: { type: String, required: true },
  urlToImage: { type: Array, required: false },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: false,
  },
});

const FavouriteArticle =
  mongoose.models.FavouriteArticle ||
  mongoose.model("FavouriteArticle", favouriteArticleSchema);

export default FavouriteArticle;
