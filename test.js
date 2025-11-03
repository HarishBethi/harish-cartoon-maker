import dotenv from "dotenv";
import Replicate from "replicate";

// 👇 Load .env from your backend folder
dotenv.config({ path: "C:/Users/CHIST/backend/.env" });

console.log("Loaded token:", process.env.REPLICATE_API_TOKEN ? "✅ Found" : "❌ Missing");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function runModel() {
  try {
    const output = await replicate.run("stability-ai/sdxl:latest", {
      input: { prompt: "a cute cartoon cat" },
    });
    console.log(output);
  } catch (err) {
    console.error(err);
  }
}

runModel();
