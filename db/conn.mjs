import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);
async function getDb() {
  try {
    let conn = await client.connect();
    let db = conn.db("ticketera");
    return db;
  } catch (e) {
    console.error(e);
  }
  return false;
}

export default getDb;
