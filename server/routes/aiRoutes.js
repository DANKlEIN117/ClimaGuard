import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an agricultural AI assistant that provides detailed, practical, and sustainable farming advice. Focus on soil health, sustainable agriculture, reforestation, and land rehabilitation.",
        },
        { role: "user", content: prompt },
      ],
    });

    const message = completion.choices[0].message.content;
    res.json({ reply: message });
  } catch (error) {
    console.error("AI Route Error:", error);
    res.status(500).json({ message: "Error generating AI response" });
  }
});

export default router;
