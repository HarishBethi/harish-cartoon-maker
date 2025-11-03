import dotenv from "dotenv";

dotenv.config({ path: "C:/Users/CHIST/backend/.env" });

console.log("✅ Token from .env:", process.env.REPLICATE_API_TOKEN);
