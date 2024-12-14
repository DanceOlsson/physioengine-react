// Import the useParams hook from react-router-dom
// This hook allows us to access URL parameters (like /questionnaires/123 where 123 is the id)
import { useParams } from "react-router-dom";

// Export a React component named KoosPage
// We use 'export' so other files can import and use this component
// The function naming follows React convention of PascalCase for components
export function KoosPage() {
  // Use the useParams hook to get URL parameters
  // We destructure the 'id' parameter from the object returned by useParams
  // This will match the :id in the route path (e.g., /questionnaires/:id)
  const { id } = useParams();

  // Return JSX - the component's UI structure
  return (
    // div container with Tailwind CSS classes:
    // - container: sets a max-width and centers content
    // - mx-auto: margin auto on left and right (centers horizontally)
    // - py-8: padding top and bottom of 2rem (32px)
    <div className="container mx-auto py-8">
      {/* Main heading using Tailwind classes:
          - text-3xl: large text size
          - font-bold: bold font weight */}
      <h1 className="text-3xl font-bold">KOOS</h1>
      {/* Placeholder comment for future questionnaire content */}
      {/* Questionnaire details will go here */}
    </div>
  );
}
