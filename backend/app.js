require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

//Conexão Mongo com then é melhor pois o mongoose.connect é async
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error", err));

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  impressions: { type: Number, default: 0 },
});

const Url = mongoose.model("Url", urlSchema);


//POST
app.post("/api/shorten", async (req, res) => {
  try {
    const { originalUrl, shortUrl: customShortUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "OriginalURL is required" });
    }

    let shortUrl;

    if (customShortUrl && customShortUrl.trim() !== "") {
      const exists = await Url.exists({ shortUrl: customShortUrl });

      if (exists) {
        return res.status(400).json({ message: "ShortURL already exists" });
      }

      shortUrl = customShortUrl;
    } else {
      shortUrl = Math.random().toString(36).substring(2, 8);

      //prevent colision
      while (await Url.exists({ shortUrl })) {
        shortUrl = Math.random().toString(36).substring(2, 8);
      }
    }

    const newUrl = new Url({ originalUrl, shortUrl });

    await newUrl.save();
    console.log(shortUrl);

    res.status(201).json({ originalUrl, shortUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET
app.get("/api/check/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;

  if (!shortUrl && shortUrl.trim() === "") {
    return res.status(400).json({ available: false });
  }
  const exists = await Url.exists({ shortUrl });

  return res.status(200).json({ available: !exists });
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOneAndUpdate(
    { shortUrl },
    { $inc: { impressions: 1 } },
    { new: true },
  );

  if (url) {
    return res.redirect(url.originalUrl);
  } else {
    return res.status(400).json("URL not found");
  }
});

//Dupla verificação de disponibilidade do Path, devido a raceCondition

//Listen
app.listen(PORT, () => {
  console.log("Servidor rodando na porta:", PORT);
});
