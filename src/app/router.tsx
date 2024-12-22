// This file defines the routing configuration for our React application using react-router-dom.
// Routing allows us to show different pages/components based on the URL path.

import { createBrowserRouter } from "react-router-dom";
import { QuestionnaireHomePage } from "@/pages/questionnaires/QuestionnaireHomePage";
import { KoosQuestionnairePage } from "@/pages/questionnaires/koos/KoosQuestionnairePage";
import { KoosResultsPage } from "@/pages/questionnaires/koos/KoosResultsPage";
import { HoosQuestionnairePage } from "@/pages/questionnaires/hoos/HoosQuestionnairePage";
import { HoosResultsPage } from "@/pages/questionnaires/hoos/HoosResultsPage";
import { DashQuestionnairePage } from "@/pages/questionnaires/dash/DashQuestionnairePage";
import { DashResultsPage } from "@/pages/questionnaires/dash/DashResultsPage";
import App from "@/App";
import { HomePage } from "@/pages/home/HomePage";
import { SatisfactionQuestionnairePage } from "@/pages/questionnaires/satisfaction/SatisfactionQuestionnairePage";
import { SatisfactionResultsPage } from "@/pages/questionnaires/satisfaction/SatisfactionResultsPage";
import FillQuestionnairePage from "@/pages/fill/[sessionId]";
import { MobileLayout } from "@/components/layout/MobileLayout";

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
            path: "koos",
            children: [
              {
                index: true,
                element: <KoosQuestionnairePage />,
              },
              {
                path: "results",
                element: <KoosResultsPage />,
              },
            ],
          },
          {
            path: "hoos",
            children: [
              {
                index: true,
                element: <HoosQuestionnairePage />,
              },
              {
                path: "results",
                element: <HoosResultsPage />,
              },
            ],
          },
          {
            path: "dash",
            children: [
              {
                index: true,
                element: <DashQuestionnairePage />,
              },
              {
                path: "results",
                element: <DashResultsPage />,
              },
            ],
          },
          {
            path: "satisfaction",
            children: [
              {
                index: true,
                element: <SatisfactionQuestionnairePage />,
              },
              {
                path: "results",
                element: <SatisfactionResultsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
