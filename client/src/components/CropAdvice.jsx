import React from "react";

function CropAdvice({ advice }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20 text-center">
      <h3 className="text-lg font-semibold text-green-300 mb-3">
        🌱 Climate-Smart Advice
      </h3>
      <p className="text-white text-base">
        {advice || "Awaiting data... Search a location to get climate insights."}
      </p>
    </div>
  );
}

export default CropAdvice;
