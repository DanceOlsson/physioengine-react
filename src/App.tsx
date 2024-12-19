// This is the main App component file that serves as the root of our React application.
// Layout structure:
// - min-h-screen and flex-col ensure full height layout
// - container, padding, and flex-1 are handled here for all child pages
// - Header is fixed for all routes
// - main tag wraps all route content via Outlet

import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
export default App;
