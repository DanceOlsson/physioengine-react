import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md border-b z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              PhysioEngine
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#questionnaires"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Questionnaires
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
