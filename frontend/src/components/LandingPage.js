import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LandingPage.css";

// Import images
import mentorsLogo from "../images/mentors-logo.jpg";
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

// Array of mentors with their images
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
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Ref for the mentor carousel
  const carouselRef = useRef(null);

  // Effect for scrolling the mentor carousel
  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1; // Scroll by 1 pixel
        // Reset scroll position when reaching the end
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    };

    // Set up interval for continuous scrolling
    const intervalId = setInterval(scrollCarousel, 30);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/signup", { email, password });
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

  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <div className="logo">
          <img src={mentorsLogo} alt="Mentors Chat Logo" />
        </div>
        <nav>
          <button className="login-btn">Login</button>
          <button className="purchase-btn">Purchase</button>
        </nav>
      </header>

      {/* Main content */}
      <main>
        <div className="content">
          <h1>
            <span className="highlight">Learn</span> from history's
            <br />
            greatest minds
          </h1>
          <p>Engage in meaningful conversations with AI-powered mentors. Gain wisdom, explore ideas, and challenge your thinking through interactive chats with history's most brilliant thinkers, leaders, and innovators.</p>
          <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit" className="signup-btn">
              Create account
            </button>
          </form>
          <div className="promo">Start your journey of wisdom today - No credit card required</div>
        </div>
      </main>

      {/* Mentor image carousel */}
      <div className="mentor-carousel" ref={carouselRef}>
        <div>
          {[...mentors, ...mentors].map((mentor, index) => (
            <img key={`${mentor.name}-${index}`} src={mentor.image} alt={mentor.name} />
          ))}
        </div>
      </div>

      {/* Features section */}
      <section className="features">
        <h2>What you'll experience.</h2>
        <div className="feature-grid">
          <div className="feature">
            <img src={debateIcon} alt="Debate icon" />
            <h3>Engaging Discussions</h3>
            <p>Participate in thought-provoking conversations on philosophy, leadership, innovation, and more.</p>
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

      {/* Footer */}
      <footer>
        <div className="links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
