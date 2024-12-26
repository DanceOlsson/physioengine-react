import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
      <nav className="w-full">
        <div className="flex h-16 2xl:h-20 3xl:h-24 items-center justify-between px-4 2xl:px-8 3xl:px-16 transition-all">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl 2xl:text-3xl 3xl:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                PhysioEngine
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 2xl:space-x-12 3xl:space-x-16">
            <Link
              to="/questionnaires"
              className="text-sm 2xl:text-base 3xl:text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Questionnaires
            </Link>
            <a
              href="#contact"
              className="text-sm 2xl:text-base 3xl:text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="mr-2 2xl:scale-125 3xl:scale-150"
            >
              <Sun className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon
                fill="currentColor"
                className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Moon
                fill="currentColor"
                className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
