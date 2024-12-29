import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, Settings, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-screen -ml-[50vw] left-1/2">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full bg-grid-blue-500/[0.03] -z-10" />
      <div
        className="absolute inset-0 w-full bg-gradient-to-b from-blue-50 via-transparent to-background 
                      dark:from-blue-950 dark:to-background -z-10"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[100vh] flex flex-col">
        <div className="text-center flex-1 flex flex-col justify-center space-y-8 sm:space-y-12">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r 
                       from-gray-900 via-blue-800 to-gray-900 dark:from-gray-100 dark:via-blue-300 dark:to-gray-100 bg-clip-text text-transparent"
          >
            <span className="block sm:inline">
              Effortless Patient Questionnaires
            </span>
            <br className="hidden sm:block" />
            <span className="text-3xl sm:text-4xl md:text-5xl block sm:inline mt-2 sm:mt-0">
              Free and Open for All
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4">
            Generate a QR code, let patients fill in the form instantly, and
            view their results in real-time—no sign-ups needed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Button size="lg" className="group w-full sm:w-auto" asChild>
              <Link to="/questionnaires">
                <ClipboardList className="mr-2 h-4 w-4" />
                Questionnaires
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group w-full sm:w-auto"
              disabled
            >
              <Settings className="mr-2 h-4 w-4" />
              Other Tools (Coming Soon)
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pb-8 pt-4 text-center animate-bounce">
          <button
            onClick={scrollToFeatures}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full"
            aria-label="Scroll to features"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
