import dotenv from "dotenv";
import Replicate from "replicate";

// Load .env file
dotenv.config({ path: "C:/Users/CHIST/backend/.env" });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

console.log("Your token is:", process.env.REPLICATE_API_TOKEN); // Optional check

// Example test call
(async () => {
  try {
    const models = await replicate.models.list();
    console.log("Connected successfully ✅");
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
