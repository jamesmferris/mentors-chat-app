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
import arcImage from "../images/arc.jpg";
import parksImage from "../images/parks.jpg";
import rooseveltImage from "../images/roosevelt.jpg";
import teresaImage from "../images/teresa.jpg";
import beauvoirImage from "../images/beauvoir.jpg";

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
  {
    id: "arc",
    name: "Joan of Arc",
    image: arcImage,
    description: "French heroine and Catholic saint.",
    quote: "I am not afraid; I was born to do this.",
    categories: ["Military Leader", "Saint", "Historical Figure"],
  },
  {
    id: "parks",
    name: "Rosa Parks",
    image: parksImage,
    description: "American civil rights activist.",
    quote: "You must never be fearful about what you are doing when it is right.",
    categories: ["Civil Rights Activist", "Historical Figure"],
  },
  {
    id: "beauvoir",
    name: "Simone de Beauvoir",
    image: beauvoirImage,
    description: "French existentialist philosopher and feminist theorist.",
    quote: "One is not born, but rather becomes, a woman.",
    categories: ["Philosopher", "Feminist", "Writer"],
  },
  {
    id: "teresa",
    name: "Mother Teresa",
    image: teresaImage,
    description: "Roman Catholic nun known for her charity work.",
    quote: "Not all of us can do great things. But we can do small things with great love.",
    categories: ["Religious Figure", "Humanitarian", "Saint"],
  },
  {
    id: "roosevelt",
    name: "Eleanor Roosevelt",
    image: rooseveltImage,
    description: "American political figure and human rights activist.",
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    categories: ["Political Figure", "Activist", "Diplomat"],
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
        {/* Sign Out Button */}
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </header>

      {/* Faceted search filters */}
      {/* New: Added container and title for filters */}
      <div className="filters-container">
        <h2>Filter Mentors by Category:</h2>
        <div className="filters">
          {getUniqueCategories().map((category) => (
            <button key={category} onClick={() => toggleFilter(category)} className={`filter-btn ${activeFilters.includes(category) ? "active" : ""}`}>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor grid section */}
      <div className="mentor-grid">
        {filteredMentors.map((mentor) => (
          <Link to={`/chat/${mentor.id}`} key={mentor.id} className="mentor-card">
            <img src={mentor.image} alt={mentor.name} />
            {/* New: Added mentor-info container for better styling */}
            <div className="mentor-info">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
