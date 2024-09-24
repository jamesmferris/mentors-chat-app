import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ChatPage.css";

// Import the mentors array from HomePage
// Note: Make sure to update the import path if necessary
import { mentors } from "./HomePage";

const ChatPage = () => {
  // State for messages displayed in the UI
  const [displayMessages, setDisplayMessages] = useState([]);
  // State for the full conversation history (including hidden messages)
  const [conversationHistory, setConversationHistory] = useState([]);
  // State for the current input in the textarea
  const [input, setInput] = useState("");
  // State to track if a message is being sent/received
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error messages
  const [error, setError] = useState(null);

  // Get the mentor ID from the URL parameters
  const { mentorId } = useParams();

  // Reference for auto-scrolling to the bottom of the chat
  const messagesEndRef = useRef(null);
  // Reference for the textarea element
  const textareaRef = useRef(null);

  // Find the current mentor based on the URL parameter
  const mentor = mentors.find((m) => m.id === mentorId);

  // Memoize the welcomeMessages object to prevent unnecessary re-renders
  // Update this object to include welcome messages for all mentors
  const welcomeMessages = useMemo(
    () => ({
      seneca: "Greetings, seeker of wisdom. I am Seneca. What troubles your mind today? Remember, we suffer more in imagination than in reality. Let us explore your thoughts and find tranquility within the storm of life.",
      aurelius: "Welcome, friend. I am Marcus Aurelius. What weighs upon your soul? Together, we shall examine your thoughts, for the happiness of your life depends upon the quality of your thoughts. Speak, and let us find strength in reason.",
      epictetus: "You've come seeking wisdom? Good. I am Epictetus. Tell me, what in your life do you wish you could change? Remember, it's not things that upset us, but our judgments about things. Let's begin our dialogue and see what we can control.",
      socrates: "Ah, a visitor! I am Socrates. What brings you to my humble abode? Perhaps you have a question... or better yet, an assumption you hold dear? Come, let us examine it together and see what truths we might uncover.",
      confucius: "Welcome, honorable guest. I am Confucius. What guidance do you seek in cultivating virtue and harmony in your life? Remember, the journey of a thousand miles begins with a single step. Let us take that step together.",
      aristotle: "Greetings, inquisitive one. I am Aristotle. What aspect of life or the cosmos do you wish to explore today? Remember, the roots of education are bitter, but the fruit is sweet. Let us embark on a journey of understanding.",
      kant: "Good day to you, seeker of knowledge. I am Immanuel Kant. What moral quandary or question of reason brings you to my door? Let us examine it through the lens of universal law and human dignity.",
      nietzsche: "So, you've arrived at my doorstep! I am Friedrich Nietzsche. What societal norms or personal limitations do you wish to overcome? Speak boldly, for to live is to suffer, to survive is to find some meaning in the suffering. Let us dance with your dragons!",
      buddha: "Peace be with you, gentle seeker. I am the Buddha. What suffering or attachment troubles your mind? Remember, in the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you. Let us explore the path to your inner peace.",
      // Add welcome messages for new mentors
      jobs: "Welcome, innovator! I'm Steve Jobs. What revolutionary ideas are brewing in your mind? Remember, the people who are crazy enough to think they can change the world are the ones who do. Let's explore your vision together.",
      ford: "Greetings, ambitious one. I'm Henry Ford. What challenges in industry or society are you looking to overcome? Remember, whether you think you can, or you think you can't – you're right. Let's discuss your goals and how to achieve them.",
      jesus: "Peace be with you, my child. I am Jesus. What burdens your heart, and how may I guide you towards love and compassion? Remember, love your neighbor as yourself. Let us explore the path of righteousness together.",
      mohammed: "Assalamu alaikum, seeker of guidance. I am Prophet Muhammad. What aspects of faith or life do you wish to discuss? Remember, the best of people are those who bring most benefit to the rest of mankind. Let us explore the ways of peace and submission to the Divine.",
    }),
    []
  );

  // Effect to set the initial welcome message when the mentor changes
  useEffect(() => {
    // Get the welcome message for the current mentor
    const welcomeMessage = welcomeMessages[mentorId] || `Welcome, seeker of wisdom. I am ${mentor?.name}. How may I assist you today?`;

    // Set the display message (visible in UI)
    setDisplayMessages([{ text: welcomeMessage, sender: "bot" }]);

    // Set the full conversation history (including hidden initial message)
    setConversationHistory([
      { role: "user", content: "Hello" }, // Hidden initial user message
      { role: "assistant", content: welcomeMessage },
    ]);
  }, [mentorId, welcomeMessages, mentor]);

  // Effect for auto-scrolling to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);

  // Function to adjust textarea height
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Effect to adjust textarea height when input changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent sending empty messages

    // Create a new user message object
    const userMessage = { text: input, sender: "user" };

    // Update display messages and conversation history
    setDisplayMessages((prev) => [...prev, userMessage]);
    setConversationHistory((prev) => [...prev, { role: "user", content: input }]);

    // Clear input field and set loading state
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Send the full conversation history to the backend
      const response = await axios.post("http://localhost:3001/api/chat", {
        messages: conversationHistory,
        mentor: mentorId,
      });

      // Create a new bot message object from the response
      const botMessage = { text: response.data.reply, sender: "bot" };

      // Update display messages and conversation history with the bot's reply
      setDisplayMessages((prev) => [...prev, botMessage]);
      setConversationHistory((prev) => [...prev, { role: "assistant", content: response.data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Function to handle key press in textarea
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // If no mentor is found, render an error message
  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  // Render the chat page
  return (
    <div className={`chat-page ${mentorId}`}>
      <Link to="/" className="back-button">
        ← Back to Mentors
      </Link>
      <div className="chat-container">
        <div className="mentor-header">
          <img src={mentor.image} alt={mentor.name} className="mentor-image" />
          <div className="mentor-info">
            <h2>{mentor.name}</h2>
            <p className="mentor-quote">"{mentor.quote}"</p>
          </div>
        </div>
        <div className="messages">
          {displayMessages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="message bot loading">
              <div className="spinner"></div>
              <p>{mentor.name} is contemplating...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="input-form">
          <textarea ref={textareaRef} value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder={`Ask ${mentor.name} for wisdom...`} disabled={isLoading} rows={1} />
          <button type="submit" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
