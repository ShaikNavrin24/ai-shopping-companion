// import vision from '@google-cloud/vision'
// const client = new vision.ImageAnnotatorClient({
//   credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS)
// });
// export default async function handler(req, res) {
//   const { imageBase64 } = req.body
//   const [result] = await client.labelDetection({ image: { content: imageBase64 } })
//   const labels = result.labelAnnotations.map(l => l.description)
//   res.status(200).json({ labels })
// }
// pages/api/labels.js
import vision from '@google-cloud/vision'

export default async function handler(req, res) {
  console.log("Checking GOOGLE_CREDENTIALS...");
  if (!process.env.GOOGLE_CREDENTIALS) {
    console.error("GOOGLE_CREDENTIALS is missing in env!");
    return res.status(500).json({ error: "Server misconfiguration: GOOGLE_CREDENTIALS not set" });
  }

  let client;
  try {
    client = new vision.ImageAnnotatorClient({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS)
    });
    console.log("Vision client initialized.");
  } catch (err) {
    console.error("Error parsing GOOGLE_CREDENTIALS or initializing client:", err);
    return res.status(500).json({ error: "Invalid GOOGLE_CREDENTIALS format" });
  }

  try {
    const { imageBase64 } = req.body;
    console.log("Got image data:", !!imageBase64);
    if (!imageBase64) {
      return res.status(400).json({ error: "No image data provided" });
    }

    const [result] = await client.labelDetection({ image: { content: imageBase64 } });
    console.log("Vision API response:", result);

    const labels = result.labelAnnotations?.map(l => l.description) || [];
    res.status(200).json({ labels });

  } catch (err) {
    console.error("Vision API call failed:", err);
    res.status(500).json({ error: "Vision API call failed", details: err.message });
  }
}
