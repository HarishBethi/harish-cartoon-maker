import Replicate from "replicate";
import "dotenv/config";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function runModel() {
  const output = await replicate.run(
    "tstramer/mo-di-diffusion:YOUR_MODEL_VERSION_ID",
    {
      input: {
        prompt: "A cute Disney-style cartoon tiger with rainbow colors",
      },
    }
  );

  console.log(output);
}

runModel();
