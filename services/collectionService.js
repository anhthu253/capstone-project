import dbConnect from "../lib/dbConnect";
import Collection from "../models/Collection";

export async function getAllCollections() {
  await dbConnect();

  const cols = await Collection.find();

  const sanitizedCollections = cols.map((col) => ({
    id: col.id,
    name: col.name,
    description: col.description,
  }));

  return sanitizedCollections;
}

export async function getCollectionById(id) {
  await dbConnect();

  const col = await Collection.findById(id);

  const sanitizedCollection = {
    id: col.id,
    name: col.name,
    description: col.description,
  };

  return sanitizedCollection;
}
