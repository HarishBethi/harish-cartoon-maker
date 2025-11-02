
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));

const PORT = process.env.PORT || 3001;
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
const MODEL_CARTOONIFY = process.env.REPLICATE_MODEL_CARTOONIFY || 'catacolabs/cartoonify:043a7a0bb103cd8ce5c63e64161eae63a99f01028b83aa1e28e53a42d86191d3';
const MODEL_SKETCH = process.env.REPLICATE_MODEL_SKETCH || 'crivera/sketch-lora';

if(!REPLICATE_TOKEN){
  console.warn('Warning: REPLICATE_API_TOKEN not set. Set it in Render environment variables.');
}

app.post("/api/convert", async (req, res) => {
  try {
    const { image, style } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // ✅ Just a placeholder response for now:
    res.json({
      message: "Image received successfully!",
      output: image, // <-- must exist for frontend
      style: style || "default"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/', (req,res) => res.send('Harish Cartoon Maker server is running.'));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
