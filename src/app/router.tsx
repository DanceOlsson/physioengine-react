// This file defines the routing configuration for our React application using react-router-dom.
// Routing allows us to show different pages/components based on the URL path.

import { createBrowserRouter } from "react-router-dom";
import { QuestionnairesPage } from "@/pages/questionnaires";
import { KoosPage } from "@/pages/questionnaires/koos.tsx";
import App from "@/App";
import { HomePage } from "@/pages/home";

// Create and export our router configuration
export const router = createBrowserRouter([
  {
    // The root path "/" is our main app layout
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        // All questionnaire-related routes will be nested under "/questionnaires"
        path: "questionnaires",
        children: [
          {
            // The index route shows when we're at exactly "/questionnaires"
            index: true,
            element: <QuestionnairesPage />,
          },
          {
            // Route for the KOOS questionnaire
            path: "koos",
            element: <KoosPage />,
          },
        ],
      },
    ],
  },
]);
