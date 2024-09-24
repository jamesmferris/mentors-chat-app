import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LandingPage.css";

// Import images (unchanged)
import socratesImage from "../images/socrates.jpg";
import aristotleImage from "../images/aristotle.jpg";
import kantImage from "../images/kant.jpg";
import buddhaImage from "../images/buddha.jpg";
import senecaImage from "../images/seneca.jpg";
import nietzscheImage from "../images/nietzsche.jpg";
import confuciusImage from "../images/confucius.jpg";
import fordImage from "../images/ford.jpg";
import jesusImage from "../images/jesus.jpg";
import jobsImage from "../images/jobs.jpg";
import muhammadImage from "../images/muhammad.jpg";
import debateIcon from "../images/debate-icon.png";
import wisdomIcon from "../images/wisdom-icon.png";
import perspectiveIcon from "../images/perspective-icon.png";
import growthIcon from "../images/growth-icon.png";

// Array of mentors with their images (unchanged)
const mentors = [
  { name: "Socrates", image: socratesImage },
  { name: "Aristotle", image: aristotleImage },
  { name: "Kant", image: kantImage },
  { name: "Buddha", image: buddhaImage },
  { name: "Seneca", image: senecaImage },
  { name: "Nietzsche", image: nietzscheImage },
  { name: "Confucius", image: confuciusImage },
  { name: "Henry Ford", image: fordImage },
  { name: "Jesus", image: jesusImage },
  { name: "Steve Jobs", image: jobsImage },
  { name: "Muhammad", image: muhammadImage },
];

const LandingPage = () => {
  // State for landing page form inputs
  const [landingEmail, setLandingEmail] = useState("");
  const [landingPassword, setLandingPassword] = useState("");

  // State for modal form inputs
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");

  // State for modal control
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Ref for the mentor carousel
  const carouselRef = useRef(null);

  // Effect for scrolling the mentor carousel (unchanged)
  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scrollCarousel, 30);

    return () => clearInterval(intervalId);
  }, []);

  // Handler for landing page form submission
  const handleLandingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/signup", { email: landingEmail, password: landingPassword });
      if (response.data.success) {
        navigate("/home"); // Redirect to home page on successful signup
      } else {
        alert(response.data.message || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  // Handler for modal form submission
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "login" : "signup";
      const response = await axios.post(`http://localhost:3001/api/${endpoint}`, { email: modalEmail, password: modalPassword });
      if (response.data.success) {
        navigate("/home"); // Redirect to home page on successful login/signup
      } else {
        alert(response.data.message || `An error occurred during ${isLogin ? "login" : "signup"}.`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  // Function to toggle between login and signup
  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  // Function to open the login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Function to close the login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setIsLogin(true); // Reset to login view when closing modal
    setModalEmail(""); // Clear modal inputs when closing
    setModalPassword("");
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <h1>Mentors</h1>
        <nav>
          <button className="login-btn" onClick={openLoginModal}>
            Login
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main>
        <div className="content">
          <h1>
            <em>Learn</em> from history's greatest minds
          </h1>
          <p>Engage in meaningful conversations with AI-powered mentors. Gain wisdom, explore ideas, and challenge your thinking through interactive chats with history's most brilliant thinkers, leaders, and innovators.</p>
          <form onSubmit={handleLandingSubmit}>
            <input type="email" value={landingEmail} onChange={(e) => setLandingEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={landingPassword} onChange={(e) => setLandingPassword(e.target.value)} placeholder="Password" required />
            <button type="submit" className="signup-btn">
              Create account
            </button>
          </form>
          <div className="promo">Start your journey of wisdom today - No credit card required</div>
        </div>
      </main>

      {/* Mentor image carousel (unchanged) */}
      <div className="mentor-carousel" ref={carouselRef}>
        <div>
          {[...mentors, ...mentors].map((mentor, index) => (
            <img key={`${mentor.name}-${index}`} src={mentor.image} alt={mentor.name} />
          ))}
        </div>
      </div>

      {/* Features section */}
      <section className="features">
        <h2>What you'll experience</h2>
        <div className="feature-grid">
          <div className="feature">
            <img src={debateIcon} alt="Debate icon" />
            <h3>Mentorship</h3>
            <p>Engage in personalized, AI-driven conversations with virtual mentors modeled after history's greatest thinkers.</p>
          </div>
          <div className="feature">
            <img src={wisdomIcon} alt="Wisdom icon" />
            <h3>Timeless Wisdom</h3>
            <p>Gain insights from the greatest thinkers and leaders in history, applicable to modern life and challenges.</p>
          </div>
          <div className="feature">
            <img src={perspectiveIcon} alt="Perspective icon" />
            <h3>New Perspectives</h3>
            <p>Challenge your assumptions and broaden your understanding of the world through diverse viewpoints.</p>
          </div>
          <div className="feature">
            <img src={growthIcon} alt="Growth icon" />
            <h3>Personal Growth</h3>
            <p>Develop critical thinking skills, foster intellectual curiosity, and enhance your leadership abilities.</p>
          </div>
        </div>
      </section>

      {/* Footer (unchanged) */}
      <footer>
        <div className="links"></div>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleModalSubmit}>
              <input type="email" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={modalPassword} onChange={(e) => setModalPassword(e.target.value)} placeholder="Password" required />
              <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={toggleLoginSignup}>{isLogin ? "Sign Up" : "Login"}</button>
            </p>
            <button className="close-modal" onClick={closeLoginModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
