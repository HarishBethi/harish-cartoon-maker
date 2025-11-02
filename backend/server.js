import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));  // increase size limit
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// POST route for your convert API
app.post("/api/convert", async (req, res) => {
  try {
    const { image, style } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // TODO: your AI/cartoonify logic goes here
    // For now, just send back the same image to test
    res.json({ result: image });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Render needs a dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
