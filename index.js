
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

app.post('/api/convert', async (req, res) => {
  try{
    const { image, style } = req.body;
    if(!image) return res.status(400).json({ error: 'No image provided' });

    const model = style === 'sketch' ? MODEL_SKETCH : MODEL_CARTOONIFY;

    const headers = {
      'Authorization': `Token ${REPLICATE_TOKEN}`,
      'Content-Type': 'application/json'
    };

    const createResp = await axios.post('https://api.replicate.com/v1/predictions', {
      version: model,
      input: { image }
    }, { headers });

    let prediction = createResp.data;
    // poll
    while(prediction.status !== 'succeeded' && prediction.status !== 'failed'){
      await new Promise(r => setTimeout(r, 1500));
      const poll = await axios.get(`https://api.replicate.com/v1/predictions/${prediction.id}`, { headers });
      prediction = poll.data;
    }

    if(prediction.status === 'succeeded'){
      const out = prediction.output;
      const outputUrl = Array.isArray(out) ? out[0] : out;
      return res.json({ output: outputUrl });
    } else {
      return res.status(500).json({ error: 'Prediction failed', details: prediction });
    }
  }catch(err){
    console.error(err.response?.data || err.message || err);
    return res.status(500).json({ error: 'Server error', details: err.response?.data || err.message });
  }
});

app.get('/', (req,res) => res.send('Harish Cartoon Maker server is running.'));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
