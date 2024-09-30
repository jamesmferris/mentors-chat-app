import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ChatPage.css";

// Import the mentors array from HomePage
// Note: Make sure to update the import path if necessary
import { mentors } from "./HomePage";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001"; // Default to localhost if REACT_APP_API_URL is not set

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
  // State to control send button visibility
  const [showSendButton, setShowSendButton] = useState(false);
  // New state for managing textarea height
  const [textareaHeight, setTextareaHeight] = useState("40px");

  // Get the mentor ID from the URL parameters
  const { mentorId } = useParams();

  // Use the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Reference for auto-scrolling to the bottom of the chat
  const messagesEndRef = useRef(null);
  // Reference for the textarea element
  const inputRef = useRef(null);

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
      jobs: "Welcome, innovator! I'm Steve Jobs. What revolutionary ideas are brewing in your mind? Remember, the people who are crazy enough to think they can change the world are the ones who do. Let's explore your vision together.",
      ford: "Greetings, ambitious one. I'm Henry Ford. What challenges in industry or society are you looking to overcome? Remember, whether you think you can, or you think you can't – you're right. Let's discuss your goals and how to achieve them.",
      jesus: "Peace be with you, my child. I am Jesus. What burdens your heart, and how may I guide you towards love and compassion? Remember, love your neighbor as yourself. Let us explore the path of righteousness together.",
      mohammed: "Assalamu alaikum, seeker of guidance. I am Prophet Muhammad. What aspects of faith or life do you wish to discuss? Remember, the best of people are those who bring most benefit to the rest of mankind. Let us explore the ways of peace and submission to the Divine.",
      arc: "Greetings, brave soul! I am Joan of Arc. What divine calling or noble cause stirs your heart? Remember, all battles are first won or lost in the mind. Let us explore your mission and find the courage to pursue it.",
      parks: "Welcome, seeker of justice. I'm Rosa Parks. What inequalities or injustices in your world are you prepared to challenge? Remember, you must never be fearful about what you are doing when it is right. Let's discuss how you can stand up for what's right in your own life.",
      beauvoir: "Bonjour, free thinker! I am Simone de Beauvoir. What societal norms or expectations are you questioning? Remember, one is not born, but rather becomes, a woman - or indeed, oneself. Let us examine the constructs that shape your reality and how you might transcend them.",
      teresa: "Blessings, compassionate one. I am Mother Teresa. What suffering in the world moves your heart to action? Remember, not all of us can do great things, but we can do small things with great love. Let us explore how you can bring more love and kindness into your corner of the world.",
      roosevelt: "Greetings, fellow citizen of the world. I'm Eleanor Roosevelt. What changes do you wish to see in your community or beyond? Remember, you must do the thing you think you cannot do. Let's discuss how you can actively participate in shaping a better world.",
      // Add welcome messages for new mentors
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
      { role: "user", content: "Hello, I'm here to seek wisdom." },
      { role: "assistant", content: welcomeMessage },
    ]);
  }, [mentorId, welcomeMessages, mentor]);

  // Effect for auto-scrolling to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);

  // Function to adjust textarea height dynamically
  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    const minHeight = 40;
    const maxHeight = 120;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Set new height based on scrollHeight, within min and max limits
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
    setTextareaHeight(`${newHeight}px`);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowSendButton(e.target.value.trim().length > 0);
    adjustTextareaHeight(e);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, sender: "user" };
    setDisplayMessages((prev) => [...prev, userMessage]);

    // Combine consecutive user messages
    let updatedHistory = [...conversationHistory];
    if (updatedHistory.length > 0 && updatedHistory[updatedHistory.length - 1].role === "user") {
      updatedHistory[updatedHistory.length - 1].content += "\n" + input;
    } else {
      updatedHistory.push({ role: "user", content: input });
    }

    setConversationHistory(updatedHistory);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        messages: updatedHistory,
        mentor: mentorId,
      });

      const botMessage = { text: response.data.reply, sender: "bot" };
      setDisplayMessages((prev) => [...prev, botMessage]);
      setConversationHistory((prev) => [...prev, { role: "assistant", content: response.data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }

    // Reset textarea height after submission
    setTextareaHeight("40px");
  };

  // Function to handle key press in textarea
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Function to handle going back to the homepage
  const handleBackToMentors = () => {
    navigate("/home"); // Navigate to the home page
  };

  // If no mentor is found, render an error message
  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  // Render the chat page
  return (
    // Main container for the chat page, with dynamic class based on mentor ID
    <div className={`chat-page ${mentorId}`}>
      {/* Back button to return to mentor selection */}
      <button onClick={handleBackToMentors} className="back-button">
        ← Back to Mentors
      </button>

      {/* Chat interface container */}
      <div className="chat-container">
        {/* Header section with mentor information */}
        <div className="mentor-header">
          <img src={mentor.image} alt={mentor.name} className="mentor-image" />
          <div className="mentor-info">
            <h2>{mentor.name}</h2>
            <p className="mentor-quote">"{mentor.quote}"</p>
          </div>
        </div>

        {/* Messages display area */}
        <div className="messages">
          {/* Map through and display all messages */}
          {displayMessages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}

          {/* Loading indicator when waiting for mentor response */}
          {isLoading && (
            <div className="message bot loading">
              <div className="spinner"></div>
              <p>{mentor.name} is contemplating...</p>
            </div>
          )}

          {/* Ref for auto-scrolling to the latest message */}
          <div ref={messagesEndRef} />
        </div>

        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}

        {/* Updated input form for user messages */}
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-wrapper">
            <textarea ref={inputRef} value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder={`Ask ${mentor.name} for wisdom...`} disabled={isLoading} style={{ height: textareaHeight }} />
            {showSendButton && (
              <button type="submit" disabled={isLoading} className="send-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
