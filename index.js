import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

const mongodbConnect = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("database connected successfully...!");
    return client;
  } catch (error) {
    console.log({ mas: "database not connect.." });
  }
};

const mongoClient = await mongodbConnect();
const db = mongoClient.db("studiospace");
const studios = db.collection("studios");

app.get("/", async (req, res) => {
  const result = await studios.find({}).toArray();
  res.send(result);
});

app.get("/toprateddata", async (req, res) => {
  const result = await studios.find({}).sort({ rating: -1 }).limit(6).toArray();
  res.send(result);
});

app.listen(PORT, () => {
  console.log("server running...");
});
