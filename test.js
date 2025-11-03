import Replicate from "replicate";
import 'dotenv/config'; // if using ES modules
// OR if you're using require syntax:
require('dotenv').config({ path: './backend/.env' });
console.log("Token loaded:", process.env.REPLICATE_API_TOKEN ? "✅ Yes" : "❌ No");


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function runModel() {
 const output = await replicate.run(
  "stability-ai/sdxl:610dddf033f10431b155f24510b609fcbca23017ee551a1b9afbc4eec79e29c",
  {
    input: {
      prompt: "A cute cartoon-style portrait of a person",
      width: 1024,
      height: 1024
    }
  }
);

  console.log(output);
}

runModel();
