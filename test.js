import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config({ path: "C:/Users/CHIST/backend/.env" });

console.log("Loaded token:", process.env.REPLICATE_API_TOKEN?.slice(0, 10) + "...");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function runModel() {
  const output = await replicate.run(
    "black-forest-labs/flux-schnell",
    { input: { prompt: "a cute cartoon cat" } }
  );
  console.log(output);
}

runModel();
