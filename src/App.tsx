// This is the main App component file that serves as the root of our React application.
// Think of it as the skeleton of your website. It imports and arranges other components

import { Header } from "@/components/layout/Header";
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
