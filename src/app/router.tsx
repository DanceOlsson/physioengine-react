// This file defines the routing configuration for our React application using react-router-dom.
// Routing allows us to show different pages/components based on the URL path.

import { createBrowserRouter } from "react-router-dom";
import { QuestionnaireHomePage } from "@/pages/questionnaires/QuestionnaireHomePage";
import App from "@/App";
import { HomePage } from "@/pages/home/HomePage";
import FillQuestionnairePage from "@/pages/fill/[sessionId]";
import { MobileLayout } from "@/components/layout/MobileLayout";
import FaqPage from "@/pages/faq/FaqPage";
import ContactPage from "@/pages/contact/ContactPage";
import CranialPage from "@/pages/cranial/CranialPage";
import { DynamicResultsPage } from "@/pages/questionnaires/DynamicResultsPage";

// Create and export our router configuration
export const router = createBrowserRouter([
  // Mobile QR code routes with separate layout
  {
    path: "fill/:sessionId",
    element: <MobileLayout />,
    children: [
      {
        index: true,
        element: <FillQuestionnairePage />,
      },
    ],
  },
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
        path: "faq",
        element: <FaqPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cranial",
        element: <CranialPage />,
      },
      {
        // All questionnaire-related routes will be nested under "/questionnaires"
        path: "questionnaires",
        children: [
          {
            // The index route shows when we're at exactly "/questionnaires"
            index: true,
            element: <QuestionnaireHomePage />,
          },
          {
            // Dynamic results route that will handle all questionnaires
            path: ":questionnaireId/results",
            element: <DynamicResultsPage />,
          },
        ],
      },
    ],
  },
]);
