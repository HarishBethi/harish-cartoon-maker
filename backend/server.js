import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Example endpoint your frontend can call
app.post("/api/convert", (req, res) => {
  // TODO: Handle image or call AI API here
  res.json({ message: "Image received successfully!" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
