// This is the main App component file that serves as the root of our React application.
// Think of it as the skeleton of your website. It imports and arranges other components

import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
