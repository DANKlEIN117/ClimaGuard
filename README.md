# ClimaGuard — AI-Powered Agriculture and Weather Intelligence Platform

**ClimaGuard** is a modern full-stack application that leverages **AI** and **real-time meteorological data** to deliver actionable insights for agriculture and environmental management.  
It combines **Gemini-powered agricultural intelligence** with **OpenWeather API data** to help users make informed decisions about soil health, reforestation, and sustainable farming.

Built with a **React.js frontend**, **Express.js backend**, and **MongoDB database**, ClimaGuard provides a seamless interface for intelligent, data-driven agricultural operations.


## Key Features

### Real-Time Weather Insights
- Integrates with **OpenWeather API** to provide accurate and localized weather data.
- Displays temperature, humidity, wind speed, and weather conditions in real time.
- Helps farmers make informed planting and harvesting decisions.

### AI-Powered Agricultural Assistant
- Uses **Google Gemini AI** to deliver intelligent responses on agriculture-related topics.
- Covers soil health, reforestation, sustainable farming, and land rehabilitation.
- Provides short, actionable, and data-informed insights for better decision-making.

### Interactive Chat Interface
- Sleek, responsive chat UI that simulates real-time AI conversations.
- Supports typing animations, “thinking” bubbles, and auto-scroll for smooth interaction.
- Designed for fast feedback and minimal distraction.

### Smart Topic Selection
- Allows users to choose from predefined agricultural focus areas.
- Ensures AI responses are contextually relevant and domain-specific.

### Secure Data Management
- Backend powered by **Express.js** and **MongoDB** for reliable data handling.
- Modular API structure with separate routes for reports, AI queries, and weather.

### Full-Stack Integration
- **Frontend:** React.js (TailwindCSS for styling)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **AI:** Google Gemini Models
- **Weather Data:** OpenWeather API


## Tech Stack

ClimaGuard is built using a modern, scalable, and full-stack JavaScript ecosystem designed for performance and flexibility.

### Frontend
- **React.js** – Dynamic and component-based UI for smooth interactions.
- **TailwindCSS** – Utility-first CSS framework for clean, responsive designs.
- **Fetch API** – Handles API calls to the backend seamlessly.
- **Responsive Design** – Works across desktops, tablets, and mobile screens.

### Backend
- **Node.js + Express.js** – Robust backend server handling routes, APIs, and middleware.
- **RESTful API Architecture** – Ensures clean, maintainable, and scalable code.
- **dotenv** – Secure environment variable management.
- **CORS Enabled** – For safe frontend-backend communication.

### AI Integration
- **Google Gemini API (Gemini 1.5 Flash / Pro)** – Powers intelligent AI responses.
- Automatic fallback to secondary models when quota limits are reached (coming soon 💡).

### Database & Cloud
- **MongoDB Atlas** – Cloud-hosted NoSQL database for efficient data storage.
- **Cloud-Ready Setup** – Easily deployable to platforms like Render, Netlify, or Vercel.

### APIs & Integrations
- **OpenWeather API** – Fetches accurate and up-to-date weather information.
- **Gemini AI API** – Provides intelligent agricultural insights.

### Development & Tools
- **Postman** – API testing and debugging.
- **Git & GitHub** – Version control and collaboration.
- **ESLint + Prettier** – Clean, consistent, and readable code formatting.


## Setup & Installation

Follow these steps to set up **ClimaGuard** locally on your machine.

### Folder Structure

ClimaGuard/
├── server/
│ ├── node_modules/
│ ├── src/
│ │ ├── routes/
│ │ │ ├── weatherRoutes.js
│ │ │ ├── aiRoutes.js
│ │ ├── controllers/
│ │ │ ├── weatherController.js
│ │ │ ├── aiController.js
│ │ ├── utils/
│ │ │ ├── fetchWeather.js
│ │ │ ├── geminiAI.js
│ │ ├── app.js
│ │ ├── server.js
│ ├── .env
│ ├── package.json
│ └── README.md
│
├── client/
│ ├── node_modules/
│ ├── public/
│ │ ├── index.html
│ │ └── favicon.ico
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── WeatherCard.jsx
│ │ │ ├── AIInsightCard.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── About.jsx
│ │ ├── App.jsx
│ │ ├── index.js
│ ├── tailwind.config.js
│ ├── package.json
│ └── README.md
│
├── .gitignore
├── README.md
└── LICENSE


### Prerequisites

Make sure you have these installed before getting started:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Optional: [Postman](https://www.postman.com/) for testing API routes



### Installation Steps

#### 1. Clone the repository
```bash
git clone https://github.com/DANKlEIN117/ClimaGuard.git
cd ClimaGuard

cd server
npm install

2. Create a .env file in the backend folder and add your API keys:

- PORT=5000
- OPENWEATHER_API_KEY=your_openweather_key
- GEMINI_API_KEY=your_gemini_key
- MONGO_URI=your_mongodb_connection_uri

- Run the backend server:

npm start

- or for live reload during development:

npm run dev


Server will start at:

http://localhost:5000


3. Setup the Frontend
cd ../client

npm install
npm run dev


Frontend will run on:

http://localhost:5173 (if using Vite)

Deployment (Optional)

Frontend: Deploy to Netlify
 or Vercel
.

Backend: Deploy to Render
 or Railway
.

Database: Host on MongoDB Atlas
.

