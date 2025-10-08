import React, { useState } from "react";
import API from "../api";

export default function Reports() {
  const [form, setForm] = useState({ name: "", location: "", issue: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitReport = async () => {
    try {
      await API.post("/", form);
      setMessage("✅ Report submitted successfully!");
    } catch (err) {
      setMessage("❌ Failed to submit report");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Report an Environmental Issue</h2>
      <input name="name" placeholder="Your Name" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="issue" placeholder="Issue (e.g., drought)" onChange={handleChange} />
      <textarea name="description" placeholder="Description..." onChange={handleChange}></textarea>
      <button onClick={submitReport}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
}
