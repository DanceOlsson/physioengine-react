import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-blue-500/[0.03] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-transparent to-blue-50/50 dark:from-blue-950 dark:to-blue-950/50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center space-y-8">
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

          <div className="flex justify-center">
            <Button size="lg" className="group">
              Explore All Tools
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
