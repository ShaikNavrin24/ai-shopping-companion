import vision from '@google-cloud/vision'
const client = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS)
});
export default async function handler(req, res) {
  const { imageBase64 } = req.body
  const [result] = await client.labelDetection({ image: { content: imageBase64 } })
  const labels = result.labelAnnotations.map(l => l.description)
  res.status(200).json({ labels })
}
