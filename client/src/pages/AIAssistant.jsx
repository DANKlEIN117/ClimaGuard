import React, { useState, useRef, useEffect } from "react";

function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("soil_health");
  const chatEndRef = useRef(null);

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

    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    // Add a temporary "thinking..." bubble
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "thinking..." },
    ]);

    try {
      const res = await fetch("https://climaguard.onrender.com/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const aiReply =
        data.reply?.trim().split(". ").slice(0, 10).join(". ") + "." ||
        "🤖 No response.";

      // Replace "thinking..." bubble with real AI reply, typed out
      typeOutText(aiReply);
    } catch (err) {
      typeOutText("⚠️ Server error — try again.");
    }

    setLoading(false);
  };

  // 🔹 Typing animation for AI reply
  const typeOutText = (text) => {
    let i = 0;
    const typingSpeed = 25;
    let typedMessage = "";

    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0 && updated[updated.length - 1].role === "assistant") {
        updated.pop(); // remove "thinking..." message
      }
      updated.push({ role: "assistant", text: "" });
      return updated;
    });

    const interval = setInterval(() => {
      typedMessage += text[i];
      i++;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = typedMessage;
        return updated;
      });

      if (i >= text.length) clearInterval(interval);
    }, typingSpeed);
  };

  // 🔹 Auto-scroll down
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 flex flex-col items-center p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-3 text-center">
        AI Agriculture Assistant
      </h1>
      <p className="text-center max-w-xl mb-6 text-gray-200">
        Smart, quick insights for your farm — ask anything from soil care to reforestation 
      </p>

      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col gap-4">
        {/* Chat Box */}
        <div className="h-96 overflow-y-auto bg-white/5 rounded-lg p-4 space-y-3 scrollbar-thin scrollbar-thumb-green-500">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 px-4 rounded-2xl max-w-[80%] break-words ${
                  msg.role === "user"
                    ? "bg-green-500 text-white self-end rounded-br-none"
                    : "bg-gray-800 text-gray-100 self-start rounded-bl-none"
                }`}
              >
                {msg.text === "thinking..." ? (
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-300" />
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleAsk} className="flex flex-col gap-3">
          <select
            className="p-2 rounded-lg text-black font-medium"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something smart..."
            className="w-full p-3 rounded-lg bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-lg font-medium text-lg transition-all ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Thinking..." : "Ask AI "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIAssistant;
