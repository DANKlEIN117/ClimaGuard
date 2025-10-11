import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import FarmerDashboard from "./components/FarmerDashboard";
import SearchContainer from "./components/SearchContainer";
import AIAssistant from "./pages/AIAssistant";





function App() {
  return (
    <Router>
      <nav className="flex justify-between items-center px-10 py-4 bg-sky-900 text-white">
        <h1 className="text-2xl font-bold">🌍 ClimaGuard</h1>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-green-300">Home</Link>
          <Link to="/dashboard" className="hover:text-green-300">Farmer Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<FarmerDashboard />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;
