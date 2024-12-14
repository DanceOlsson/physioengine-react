// This is the main App component file that serves as the root of our React application.
// Think of it as the skeleton of your website. It imports and arranges other components

import React from "react"; // Import React to use JSX syntax
import { Header } from "./components/Header"; // Import the Header component for navigation
import { Hero } from "./components/Hero"; // Import the Hero component for the main landing section
import { Features } from "./components/Features"; // Import the Features component to show app features

// Define the main App component using a function component
// This component structures our entire application layout
function App() {
  return (
    // The outer div ensures minimum full viewport height
    <div className="min-h-screen">
      {/* Header component contains navigation and branding */}
      <Header />
      {/* Main content area of the application */}
      <main>
        {/* Hero section for prominent landing content */}
        <Hero />
        {/* Features section to showcase app capabilities */}
        <Features />
      </main>
    </div>
  );
}

// Export the App component as the default export so it can be imported in main.tsx
export default App;
