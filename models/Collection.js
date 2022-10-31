import mongoose from "mongoose";
const { Schema } = mongoose;

const collectionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
