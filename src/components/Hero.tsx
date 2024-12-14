import { Button } from "./ui/button";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-blue-500/[0.03] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-transparent to-blue-50/50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center space-y-8">
          <div
            className="inline-flex items-center rounded-full px-4 py-1 text-sm 
                        bg-blue-50 text-blue-700 ring-1 ring-blue-100 mb-8"
          >
            <span>Launching soon</span>
            <span className="ml-2 h-4 w-px bg-blue-200" />
            <span className="ml-2">Join the waitlist →</span>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r 
                       from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent"
          >
            Streamline Your
            <br />
            Physiotherapy Practice
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Collect, score, and analyze physiotherapy questionnaires efficiently
            with our modern digital platform designed for healthcare
            professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
