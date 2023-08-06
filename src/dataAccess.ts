import { EmotionEntryModel } from "./types/EmotionEntryModel";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.CONNECTION_STRING || "";

export async function saveEmotionEntries(entries: EmotionEntryModel[]) {
  const collection = await getCollection();
  await collection.insertMany(entries);
}

export async function getEmotionEntries() {
  const collection = await getCollection();
  return (await collection.find().toArray()) as unknown as EmotionEntryModel[];
}

async function getCollection() {
  const client = new MongoClient(connectionString);
  await client.connect();

  const db = client.db("DaylioEmotionEntries");
  return db.collection("entries");
}
