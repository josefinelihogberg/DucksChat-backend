import { MongoClient } from "mongodb";
import * as env from "dotenv";
env.config();

let db = undefined;
const appDatabaseName = "chat-project";

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = process.env.MONGO_URI;
  const client = new MongoClient(url);

  db = client.db(appDatabaseName);

  return db;
}
