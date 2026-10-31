import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

const mongodbConnect = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    return client;
  } catch (error) {
    console.log({ mas: "database not connect.." });
  }
};

const mongoClient = await mongodbConnect();
const db = mongoClient.db("studiospace");
const studios = db.collection("studios");

app.get("/", async (req, res) => {
  res.status(200).send({ status: 200, mes: "server running..." });
});

// get all data
app.get("/getalldata", async (req, res) => {
  const { category } = req.query;

  if (category !== undefined && typeof category !== "string") {
    return res
      .status(400)
      .send({ message: "category must be a single string" });
  }

  const normalizedCategory = category?.trim();
  const filter = normalizedCategory ? { category: normalizedCategory } : {};
  const result = await studios.find(filter).toArray();

  res.status(200).send(result);
});


// get single studio data 
app.get("/singlestudio/:id", async (req, res) => {
  const { id } = req.params;
  const result = await studios.findOne({ _id: new ObjectId(id) });
  res.send(result);
});


// add studio data 
app.post("/addstudio",async (req,res ) => {
  const data = req.body
  const result = await studios.insertOne(data)
  res.send(result)
}
)

// get top rated data
app.get("/toprateddata", async (req, res) => {
  const result = await studios.find({}).sort({ rating: -1 }).limit(6).toArray();
  res.send(result);
});

app.listen(PORT, () => {
  console.log("server running...");
});
