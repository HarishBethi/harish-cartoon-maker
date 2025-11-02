import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Fix: /api/convert route now returns a proper response
app.post("/api/convert", async (req, res) => {
  try {
    const { image, style } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // ✅ Temporary: Just echo back the input image to confirm connection
    res.json({
      message: "Image received successfully!",
      style: style || "default",
      result: image, // same image — just to test connection
    });
  } catch (error) {
    console.error("Error in /api/convert:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
