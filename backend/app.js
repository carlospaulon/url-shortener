require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT; // Ou 3000
const mongoURI = process.env.MONGO_URI;

//try-catch ou then?
try {
  mongoose.connect(mongoURI);
  console.log("Connected to MongoDB");
} catch (err) {
  console.log("MongoDB connection error", err);
}

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  impressions: { type: Number, default: 0 },
});

const Url = mongoose.model("Url", urlSchema);

//Create here:
//Shorten URL

//POST
app.post("/api/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 8);

  const newUrl = new Url({ originalUrl, shortUrl });

  await newUrl.save();
  console.log(shortUrl);

  res.status(201).json({ originalUrl, shortUrl });
});

//GET
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
    const url = await Url.findOneAndUpdate({ shortUrl }, { $inc: {impressions: 1}}, {new: true});

  if (url) {
    return res.redirect(url.originalUrl);
  } else {
    return res.status(400).json("URL not found");
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta:", PORT);
});
