// Load .env file manually from backend folder
import dotenv from "dotenv";
dotenv.config({ path: "C:/Users/CHIST/backend/.env" });

import Replicate from "replicate";

console.log("Loaded token:", process.env.REPLICATE_API_TOKEN ? "✅ Found" : "❌ Missing");

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Example call to test your setup
async function runModel() {
  const result = await replicate.run("stability-ai/sdxl:latest", {
    input: { prompt: "a cute cartoon cat" },
  });
  console.log(result);
}

runModel();
