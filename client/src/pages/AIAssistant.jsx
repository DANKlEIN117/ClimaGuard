import React, { useState } from "react";

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("soil health");
  const [advice, setAdvice] = useState("");
  const [chat, setChat] = useState([]); // 🟢 store question + response history

  const topics = [
    { id: "soil_health", name: "Soil Health" },
    { id: "sustainable_agriculture", name: "Sustainable Agriculture" },
    { id: "reforestation", name: "Reforestation" },
    { id: "land_rehabilitation", name: "Land Rehabilitation" },
  ];

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert("Please type your question first!");
      return;
    }

    setLoading(true);
    setAdvice("");
    setResponse("");

    // Add user message immediately to chat
    const userMessage = { role: "user", content: prompt };
    setChat((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const reply = data.reply || "No response received 😢";

      // Add AI response to chat
      const aiMessage = { role: "ai", content: reply };
      setChat((prev) => [...prev, aiMessage]);

      setAdvice(reply);
    } catch (err) {
      const errorMsg = "⚠️ Server error — could not connect to AI service.";
      setChat((prev) => [...prev, { role: "ai", content: errorMsg }]);
      setAdvice(errorMsg);
    }

    setLoading(false);
    setPrompt(""); // clear input
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 flex flex-col items-center p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-center">
        🌿 AI Agriculture Assistant
      </h1>
      <p className="text-center max-w-xl mb-8 text-gray-200">
        Chat with an AI about soil health, sustainability, and more.  
        Let’s make farming smarter 🌾
      </p>

      {/* Chat Box */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex-1 h-[400px] overflow-y-auto space-y-4 mb-4 p-2">
          {chat.length === 0 && (
            <p className="text-gray-300 text-center italic">
              Start the conversation by asking a question 👇
            </p>
          )}

          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 max-w-[80%] rounded-2xl ${
                  msg.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-gray-100"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-gray-300 italic text-center animate-pulse">
              Thinking...
            </p>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleAsk} className="flex flex-col gap-3">
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

          <div className="flex gap-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask your question..."
              className="flex-1 p-3 rounded-lg bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="2"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-3 rounded-lg font-semibold ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;
