// Import necessary dependencies from React and ReactDOM
import { StrictMode } from "react"; // StrictMode helps catch common bugs during development
import { createRoot } from "react-dom/client"; // createRoot is the new way to render React apps
import "@/styles/globals.css"; // Import global CSS styles
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { ThemeProvider } from "@/components/theme-provider";

// Create a root element and render our React app into it
// The '!' tells TypeScript we're certain the element exists
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="physioengine-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
