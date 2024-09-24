import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Import components
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import LandingPage from "./components/LandingPage";

// Define the main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the landing page (signup) */}
          <Route path="/" element={<LandingPage />} />
          {/* Route for the home page (after login) */}
          <Route path="/home" element={<HomePage />} />
          {/* Route for individual chat pages */}
          <Route path="/chat/:mentorId" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
