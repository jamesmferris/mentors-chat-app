# Mentors Chat

Mentors Chat is an interactive web application that allows users to engage in meaningful conversations with AI-powered mentors inspired by history's greatest thinkers, leaders, and innovators. This application provides a unique platform for users to gain wisdom, explore ideas, and challenge their thinking through simulated dialogues with virtual mentors.

## Features

- User authentication system (signup, login, logout)
- Interactive chat interface with AI-powered mentors
- Diverse selection of mentors from various fields and time periods
- Faceted search and filtering of mentors by category
- Responsive design for seamless use across devices

## Technology Stack

- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB
- AI Integration: Anthropic's Claude API (pre-configured)
- Styling: CSS with responsive design

## Project Structure

The project is divided into two main directories:

- `frontend/`: Contains the React application
- `backend/`: Contains the Node.js/Express server

### Key Components

- Landing Page: User signup and introduction to the application
- Home Page: Displays the list of available mentors with filtering options
- Chat Page: Provides the interactive chat interface with selected mentors

## Setup and Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Start the backend server:
   ```
   cd backend && npm start
   ```
4. Start the frontend development server:
   ```
   cd frontend && npm start
   ```
5. The application should now be running on `http://localhost:3000`.

## API Usage

This application comes pre-configured with both an Anthropic API key for Claude and a MongoDB database connection. There's no need for users to obtain or configure their own API keys or database connections.

Please note:

- All necessary credentials are securely stored on the backend and are not exposed to frontend users.
- Usage is monitored and may be subject to rate limiting to ensure fair use for all users.
- If you encounter any issues related to API access or database connectivity, please contact the project maintainer.

## Frontend Components

The main components of the frontend application include:

- `LandingPage`: Handles user signup and provides an introduction to the application
- `HomePage`: Displays the list of mentors with filtering options
- `ChatPage`: Provides the interactive chat interface for conversations with mentors

For the implementation of these components, refer to their respective files in the `frontend/src/components/` directory.

## Styling

The application uses custom CSS for styling, with separate CSS files for each main component. The styles are designed to be responsive and provide a consistent user experience across devices.

## Future Enhancements

- Implement user profiles and conversation history
- Add more mentors and expand the range of topics
- Integrate advanced natural language processing for more nuanced conversations
- Implement a recommendation system for suggesting relevant mentors based on user interests

## Contributing

Contributions to Mentors Chat are welcome. Please ensure to follow the existing code style and submit pull requests for any new features or bug fixes.

## License

This project is licensed under the MIT License.

## Disclaimer

This application uses shared API keys and database connections for demonstration purposes. In a production environment, it's recommended to implement proper credential management, security measures, and usage monitoring.
