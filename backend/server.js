import express from "express";
import Replicate from "replicate";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

app.post("/api/convert", async (req, res) => {
  try {
    const { image } = req.body;
    const output = await replicate.run(
      "cjwbw/cartoonify:4d6f0b4c53e02eeb6da8ad2b8c3e2c7f2fcd650b56e05d7a4e71f512e1b2b9a0",
      { input: { image } }
    );
    res.json({ output });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running"));
