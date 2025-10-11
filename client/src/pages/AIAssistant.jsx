import React, { useState } from "react";

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Add these missing states
  const [topic, setTopic] = useState("soil health"); // Default dropdown topic
  const [advice, setAdvice] = useState(""); // Store advice response here


  const topics = [
    { id: "soil_health", name: "Soil Health" },
    { id: "sustainable_agriculture", name: "Sustainable Agriculture" },
    { id: "reforestation", name: "Reforestation" },
    { id: "land_rehabilitation", name: "Land Rehabilitation" },
  ];

  const handleAsk = async () => {
  if (typeof prompt !== "string" || !prompt.trim()) {
    alert("Please type your question first!");
    return;
  }

  setLoading(true);
  setResponse("");

  try {
    const res = await fetch("https://climaguard.onrender.com/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.reply || "No response received 😢");
  } catch (err) {
    setResponse("⚠️ Server error — could not connect to AI service.");
  }

  setLoading(false);
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 flex flex-col items-center p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 text-center">
         AI Agriculture Assistant
      </h1>
      <p className="text-center max-w-xl mb-10 text-gray-200">
        Get smart agricultural insights powered by AI — from soil health to
        reforestation. Enter your details and let the assistant guide you.
      </p>

      <form
        onSubmit={handleAsk}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-lg flex flex-col gap-4"
      >
        <label className="font-semibold text-lg">Select Topic:</label>
        <select
          className="p-3 rounded-lg text-black outline-none"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="">-- Choose a topic --</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <label className="font-semibold text-lg">
          Provide context or a question:
        </label>
        <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}  // ✅ FIXED
            placeholder="Ask about soil health, reforestation, or sustainable agriculture..."
            className="w-full p-3 rounded-lg bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
        />


        <button
          type="submit"
          disabled={loading}
          className={`mt-2 py-3 rounded-lg font-medium text-lg transition-all ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Analyzing..." : "Get AI Advice"}
        </button>
      </form>

      {advice && (
        <div className="bg-white/10 p-6 rounded-xl mt-4 text-gray-200">
            <h3 className="text-lg font-semibold">AI Advice</h3>
            <p className="mt-2">{advice}</p>
        </div>
        )}

    </div>
  );
};

export default AIAssistant;
