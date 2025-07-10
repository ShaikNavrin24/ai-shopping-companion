import { getChatResponse } from "@/lib/openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question } = req.body;

  try {
    const answer = await getChatResponse(question);
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return res.status(500).json({ answer: "Something went wrong." });
  }
}
