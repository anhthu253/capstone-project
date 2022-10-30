import dbConnect from "../../../lib/dbConnect";
import Collection from "../../../models/Collection";
import { getAllCollections } from "../../../services/collectionService";

export default async function handler(request, response) {
  await dbConnect();
  switch (request.method) {
    case "GET":
      const cols = await getAllCollections();
      return response.status(200).json(cols);
    case "POST":
      const col = JSON.parse(request.body);
      const { name } = col;
      const newCreatedCol = await Collection.updateOne(
        {
          name: name,
        },
        {
          $setOnInsert: col,
        },
        { upsert: true }
      );

      return response.status(201).json({
        message: "Collection saved",
        createdId: newCreatedCol.upsertedId,
      });
  }
  return response.status(405).json({ message: "HTTP method is not allowed" });
}
