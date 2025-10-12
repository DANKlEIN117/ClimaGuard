import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Test route to list available models
router.get("/models", async (req, res) => {
  try {
    const result = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + process.env.GEMINI_API_KEY);
    const data = await result.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ message: "Failed to fetch models" });
  }
});

// ✅ Your AI chat route
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const model = "models/gemini-2.5-flash"; // make sure this model exists
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an agricultural AI assistant. Respond briefly and intelligently (max 10 sentences). Be helpful and clear.

        User's question: ${prompt}`
                }
              ]
            }
          ]
        }),

      }
    );

    const data = await response.json();
    res.json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response" });
  } catch (error) {
    console.error("Gemini AI Route Error:", error);
    res.status(500).json({ message: "Error generating AI response" });
  }
});

export default router;
