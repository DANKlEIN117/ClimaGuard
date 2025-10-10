import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
console.log("✅ Loaded API key:", process.env.OPENWEATHER_API_KEY ? "Yes" : "No");


const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/reports", reportRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection failed:", err));


app.get("/api/weather/:location", async (req, res) => {
  const location = req.params.location;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location},KE&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(data.cod).json({ message: "Error fetching weather data" });
    }

    // ✅ Return the full structure your React app expects
    res.json({
      name: data.name,
      main: data.main,
      weather: data.weather,
      wind: data.wind,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
