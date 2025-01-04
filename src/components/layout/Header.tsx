import { Button } from "@/components/ui/button";
import {
  Menu,
  Moon,
  Sun,
  Stethoscope,
  Brain,
  Baby,
  Dumbbell,
  Calculator,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

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
          <div className="hidden md:flex md:items-center md:gap-8 2xl:gap-12 3xl:gap-16">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm 2xl:text-base 3xl:text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Assessment Tools</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/questionnaires" className="flex items-center">
                      <Stethoscope className="mr-2 h-4 w-4" />
                      Patient Questionnaires
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Activity className="mr-2 h-4 w-4" />
                    Functional Tests
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuLabel>Performance Metrics</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>
                    <Activity className="mr-2 h-4 w-4" />
                    Cardiopulmonary Evaluations
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Dumbbell className="mr-2 h-4 w-4" />
                    Strength Measurements
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuLabel>Pediatric Instruments</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>
                    <Baby className="mr-2 h-4 w-4" />
                    Growth Trackers
                  </DropdownMenuItem>
                  <Link to="/cranial">
                    <DropdownMenuItem>
                      <Brain className="mr-2 h-4 w-4" />
                      Cranial Measurements
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuLabel>Clinical Calculators</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>
                    <Calculator className="mr-2 h-4 w-4" />
                    Body Metrics
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="text-sm 2xl:text-base 3xl:text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors p-0 h-auto"
              asChild
            >
              <Link to="/faq">FAQ</Link>
            </Button>

            <Button
              variant="ghost"
              className="text-sm 2xl:text-base 3xl:text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors p-0 h-auto"
              asChild
            >
              <a href="#contact">Contact</a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2 2xl:scale-125 3xl:scale-150"
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
