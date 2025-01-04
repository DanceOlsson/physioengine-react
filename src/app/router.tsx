// This file defines the routing configuration for our React application using react-router-dom.
// Routing allows us to show different pages/components based on the URL path.

import { createBrowserRouter } from "react-router-dom";
import { QuestionnaireHomePage } from "@/pages/questionnaires/QuestionnaireHomePage";
import { KoosResultsPage } from "@/pages/questionnaires/koos/KoosResultsPage";
import { HoosResultsPage } from "@/pages/questionnaires/hoos/HoosResultsPage";
import { DashResultsPage } from "@/pages/questionnaires/dash/DashResultsPage";
import { SefasResultsPage } from "@/pages/questionnaires/sefas/SefasResultsPage";
import { Eq5dResultsPage } from "@/pages/questionnaires/eq5d/Eq5dResultsPage";
import App from "@/App";
import { HomePage } from "@/pages/home/HomePage";
import { SatisfactionResultsPage } from "@/pages/questionnaires/satisfaction/SatisfactionResultsPage";
import FillQuestionnairePage from "@/pages/fill/[sessionId]";
import { MobileLayout } from "@/components/layout/MobileLayout";
import FaqPage from "@/pages/faq/FaqPage";
import ContactPage from "@/pages/contact/ContactPage";
import CranialPage from "@/pages/cranial/CranialPage";

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
            // Route for the KOOS questionnaire
            path: "koos/results",
            element: <KoosResultsPage />,
          },
          {
            path: "hoos/results",
            element: <HoosResultsPage />,
          },
          {
            path: "dash/results",
            element: <DashResultsPage />,
          },
          {
            path: "satisfaction/results",
            element: <SatisfactionResultsPage />,
          },
          {
            path: "sefas/results",
            element: <SefasResultsPage />,
          },
          {
            path: "eq5d/results",
            element: <Eq5dResultsPage />,
          },
        ],
      },
    ],
  },
]);
