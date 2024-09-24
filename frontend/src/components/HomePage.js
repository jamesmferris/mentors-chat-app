import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

// Import mentor images
import senecaImage from "../images/seneca.jpg";
import aureliusImage from "../images/aurelius.jpg";
import epictetusImage from "../images/epictetus.jpg";
import socratesImage from "../images/socrates.jpg";
import confuciusImage from "../images/confucius.jpg";
import aristotleImage from "../images/aristotle.jpg";
import kantImage from "../images/kant.jpg";
import nietzscheImage from "../images/nietzsche.jpg";
import buddhaImage from "../images/buddha.jpg";
import jobsImage from "../images/jobs.jpg";
import fordImage from "../images/ford.jpg";
import jesusImage from "../images/jesus.jpg";
import muhammadImage from "../images/muhammad.jpg";

// Define the mentors array with detailed information and categories
export const mentors = [
  {
    id: "seneca",
    name: "Seneca",
    image: senecaImage,
    description: "Roman Stoic philosopher, statesman, and playwright.",
    quote: "We suffer more often in imagination than in reality.",
    categories: ["Philosopher", "Stoicism"],
  },
  {
    id: "buddha",
    name: "Buddha",
    image: buddhaImage,
    description: "Spiritual teacher and founder of Buddhism.",
    quote: "Peace comes from within. Do not seek it without.",
    categories: ["Philosopher", "Religious Figure", "Eastern Philosophy"],
  },
  {
    id: "aurelius",
    name: "Marcus Aurelius",
    image: aureliusImage,
    description: "Roman Emperor and Stoic philosopher.",
    quote: "Very little is needed to make a happy life; it is all within yourself in your way of thinking.",
    categories: ["Philosopher", "Stoicism"],
  },
  {
    id: "socrates",
    name: "Socrates",
    image: socratesImage,
    description: "Foundational figure in Western philosophy.",
    quote: "The unexamined life is not worth living.",
    categories: ["Philosopher", "Western Philosophy"],
  },
  {
    id: "confucius",
    name: "Confucius",
    image: confuciusImage,
    description: "Chinese philosopher and teacher.",
    quote: "It does not matter how slowly you go as long as you do not stop.",
    categories: ["Philosopher", "Eastern Philosophy"],
  },
  {
    id: "aristotle",
    name: "Aristotle",
    image: aristotleImage,
    description: "Greek philosopher and scientist.",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    categories: ["Philosopher", "Western Philosophy"],
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    image: kantImage,
    description: "German philosopher of the Enlightenment.",
    quote: "Act only according to that maxim whereby you can, at the same time, will that it should become a universal law.",
    categories: ["Philosopher", "Western Philosophy"],
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    image: nietzscheImage,
    description: "German philosopher, cultural critic, and philologist.",
    quote: "He who has a why to live can bear almost any how.",
    categories: ["Philosopher", "Western Philosophy"],
  },
  {
    id: "epictetus",
    name: "Epictetus",
    image: epictetusImage,
    description: "Greek Stoic philosopher.",
    quote: "It's not what happens to you, but how you react to it that matters.",
    categories: ["Philosopher", "Stoicism"],
  },
  {
    id: "jobs",
    name: "Steve Jobs",
    image: jobsImage,
    description: "Co-founder of Apple Inc. and pioneer in personal computing.",
    quote: "The people who are crazy enough to think they can change the world are the ones who do.",
    categories: ["Business Leader", "Tech Visionary"],
  },
  {
    id: "ford",
    name: "Henry Ford",
    image: fordImage,
    description: "Founder of Ford Motor Company who revolutionized factory production.",
    quote: "All life is experience, and one level is exchanged for another only when its lesson is learned.",
    categories: ["Business Leader", "Philanthropist"],
  },
  {
    id: "jesus",
    name: "Jesus Christ",
    image: jesusImage,
    description: "Central figure of Christianity.",
    quote: "Love your neighbor as yourself.",
    categories: ["Religious Figure", "Spiritual Leader"],
  },
  {
    id: "muhammad",
    name: "Prophet Muhammad",
    image: muhammadImage,
    description: "Founder of Islam.",
    quote: "The best of people are those who bring most benefit to the rest of mankind.",
    categories: ["Religious Figure", "Spiritual Leader"],
  },
];

const HomePage = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State for active filters
  const [activeFilters, setActiveFilters] = useState([]);

  // Function to handle sign out
  const handleSignOut = () => {
    // TODO: Add logout logic here (e.g., clearing tokens, user data)
    localStorage.removeItem("authToken"); // Remove auth token if you're using one
    navigate("/"); // Redirect to the landing page
  };

  // Function to toggle filters
  const toggleFilter = (category) => {
    setActiveFilters((prevFilters) => (prevFilters.includes(category) ? prevFilters.filter((filter) => filter !== category) : [...prevFilters, category]));
  };

  // Function to get unique categories
  const getUniqueCategories = () => {
    const categories = mentors.flatMap((mentor) => mentor.categories);
    return [...new Set(categories)];
  };

  // Filter mentors based on active filters
  const filteredMentors = activeFilters.length > 0 ? mentors.filter((mentor) => activeFilters.some((filter) => mentor.categories.includes(filter))) : mentors;

  return (
    <div className="home-page">
      {/* Header section */}
      <header>
        <h1>Mentors</h1>
        <p className="subheader">Seek wisdom and advice from history's greatest minds</p>
        {/* Sign Out Button */}
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </header>

      {/* Faceted search filters */}
      <div className="filters">
        {getUniqueCategories().map((category) => (
          <button key={category} onClick={() => toggleFilter(category)} className={`filter-btn ${activeFilters.includes(category) ? "active" : ""}`}>
            {category}
          </button>
        ))}
      </div>

      {/* Mentor grid section */}
      <div className="mentor-grid">
        {filteredMentors.map((mentor) => (
          <Link to={`/chat/${mentor.id}`} key={mentor.id} className="mentor-card">
            <img src={mentor.image} alt={mentor.name} />
            <h2>{mentor.name}</h2>
            <p className="description">{mentor.description}</p>
            <p className="quote">"{mentor.quote}"</p>
            <div className="categories">
              {mentor.categories.map((category) => (
                <span key={category} className="category-tag">
                  {category}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
