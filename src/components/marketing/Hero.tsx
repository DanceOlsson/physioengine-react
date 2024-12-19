import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative w-screen -ml-[50vw] left-1/2">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full bg-grid-blue-500/[0.03] -z-10" />
      <div
        className="absolute inset-0 w-full bg-gradient-to-b from-blue-50 via-transparent to-background 
                      dark:from-blue-950 dark:to-background -z-10"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12 pt-40 pb-32">
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r 
                       from-gray-900 via-blue-800 to-gray-900 dark:from-gray-100 dark:via-blue-300 dark:to-gray-100 bg-clip-text text-transparent"
          >
            Effortless Patient Questionnaires
            <br />
            <span className="text-4xl md:text-5xl">Free and Open for All</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Generate a QR code, let patients fill in the form instantly, and
            view their results in real-time—no sign-ups needed.
          </p>

          <div className="flex justify-center gap-4">
            <Button size="lg" className="group" asChild>
              <Link to="/questionnaires">
                <ClipboardList className="mr-2 h-4 w-4" />
                Questionnaires
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="group" disabled>
              <Settings className="mr-2 h-4 w-4" />
              Other Tools (Coming Soon)
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
