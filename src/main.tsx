// Import necessary dependencies from React and ReactDOM
import { StrictMode } from "react"; // StrictMode helps catch common bugs during development
import { createRoot } from "react-dom/client"; // createRoot is the new way to render React apps
import "./index.css"; // Import global CSS styles
import App from "./App.tsx"; // Import our main App component

// Create a root element and render our React app into it
// The '!' tells TypeScript we're certain the element exists
createRoot(document.getElementById("root")!).render(
  // StrictMode enables extra checks and warnings in development
  <StrictMode>
    {/* App is our main component that contains all other components */}
    <App />
  </StrictMode>
);
