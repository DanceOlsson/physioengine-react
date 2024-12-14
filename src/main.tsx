// Import necessary dependencies from React and ReactDOM
import { StrictMode } from "react"; // StrictMode helps catch common bugs during development
import { createRoot } from "react-dom/client"; // createRoot is the new way to render React apps
import "./index.css"; // Import global CSS styles
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";

// Create a root element and render our React app into it
// The '!' tells TypeScript we're certain the element exists
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
