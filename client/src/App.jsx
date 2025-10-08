import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#2E7D32", color: "white" }}>
        <Link to="/" style={{ color: "white", marginRight: "1rem" }}>🏠 Home</Link>
        <Link to="/reports" style={{ color: "white" }}>📋 Reports</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
