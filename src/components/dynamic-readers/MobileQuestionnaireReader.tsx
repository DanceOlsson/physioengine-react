/**
 * MobileQuestionnaireReader Component
 *
 * A mobile-optimized questionnaire interface that displays questions one at a time.
 * Features include:
 * - Progress tracking
 * - Multiple question types (options, text, slider)
 * - Section instructions
 * - Animated transitions
 * - Conditional questions
 */

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Question, Questionnaire } from "@/lib/types/questionnaire.types";
import { motion, AnimatePresence } from "framer-motion";
import { database } from "@/lib/firebase";
import { ref, get, set } from "firebase/database";

// Props interface for the component
interface MobileQuestionnaireReaderProps {
  questionnaire: Questionnaire;
  onSubmit: (responses: Record<string, number | string>) => void;
}

// Type to represent either a question or a section instruction
type QuestionOrSection = {
  type: "question" | "section";
  id: string;
  text: string;
  sectionTitle?: string;
  sectionInstructions?: string;
  question?: Question;
};

export function MobileQuestionnaireReader({
  questionnaire,
  onSubmit,
}: MobileQuestionnaireReaderProps) {
  // Get sessionId from the URL path
  const sessionId = window.location.pathname.split("/").pop();

  // Flatten sections and questions into a single array for linear navigation
  const allItems: QuestionOrSection[] = [
    // Add questionnaire instructions as first item if they exist
    ...(questionnaire.instructions
      ? [
          {
            type: "section" as const,
            id: "questionnaire-instructions",
            text: questionnaire.title,
            sectionInstructions: questionnaire.instructions,
          },
        ]
      : []),
    // Then add sections and questions
    ...questionnaire.sections.flatMap((section) => {
      // Only create section item if there's a title or instructions
      const sectionItem: QuestionOrSection | null =
        section.title || section.instructions
          ? {
              type: "section" as const,
              id: `section-${section.title || "untitled"}`,
              text: section.title || questionnaire.title,
              sectionInstructions: section.instructions,
            }
          : null;

      const questions: QuestionOrSection[] = section.questions.map((q) => ({
        type: "question" as const,
        id: q.id,
        text: q.text,
        sectionTitle: section.title,
        sectionInstructions: section.instructions,
        question: q,
      }));

      return sectionItem ? [sectionItem, ...questions] : questions;
    }),
  ];

  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number | string>>(
    {}
  );
  const [selectedOption, setSelectedOption] = useState<string | number | null>(
    null
  );

  const currentItem = allItems[currentIndex];
  const totalItems = allItems.length;
  const progress = ((currentIndex + 1) / totalItems) * 100;

  // Update progress in Firebase
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    if (Object.keys(responses).length > 0) {
      const progressRef = ref(database, `sessions/${sessionId}/progress`);

      // First verify we can read the session
      get(ref(database, `sessions/${sessionId}`))
        .then((snapshot) => {
          if (!snapshot.exists()) {
            console.error("Session not found in Firebase");
            return;
          }

          // Then set the progress
          return set(progressRef, {
            current: currentIndex + 1,
            total: totalItems,
          });
        })
        .catch((error) => {
          console.error("Firebase progress update failed:", error);
        });
    }
  }, [currentIndex, totalItems, sessionId, responses]);

  // Handlers for different question types and navigation
  const handleOptionSelect = (value: string | number) => {
    if (selectedOption === value) {
      setResponses((prev) => {
        const newResponses = { ...prev, [currentItem.id]: value };
        return newResponses;
      });

      // Add a small delay and prevent multiple rapid transitions
      if (currentIndex < totalItems - 1) {
        // Clear any existing timeout
        const timeoutId = setTimeout(() => {
          try {
            setSelectedOption(null);
            setCurrentIndex((prev) => prev + 1);
          } catch (error) {
            console.error("Navigation error:", error);
          }
        }, 400);

        // Cleanup timeout on unmount or re-render
        return () => clearTimeout(timeoutId);
      }
    } else {
      setSelectedOption(value);
    }
  };

  const handleTextInput = (value: string) => {
    setResponses((prev) => ({ ...prev, [currentItem.id]: value }));
  };

  const handleSliderInput = (value: number) => {
    setResponses((prev) => ({ ...prev, [currentItem.id]: value }));
    if (currentIndex < totalItems - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 400);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedOption(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setSelectedOption(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    try {
      // Filter out section responses before submitting
      const questionResponses = Object.fromEntries(
        Object.entries(responses).filter(([key]) => !key.startsWith("section-"))
      );
      onSubmit(questionResponses);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // Check if all required questions are answered
  const isComplete = () => {
    const requiredQuestions = allItems
      .filter((item) => {
        if (item.type !== "question") return false;
        if (item.question?.dependsOn) {
          return (
            responses[item.question.dependsOn.questionId] ===
            item.question.dependsOn.expectedValue
          );
        }
        return true;
      })
      .map((q) => q.id);

    return requiredQuestions.every((q) => q in responses);
  };

  // Render different question types (options, text, slider)
  const renderQuestion = (question: Question) => {
    // If question has options, it's a regular question regardless of type
    if ("options" in question) {
      return (
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.value;
            const isConfirmed = responses[currentItem.id] === option.value;

            return (
              <motion.button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                type="button"
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left relative",
                  "transition-colors duration-200",
                  isSelected && !isConfirmed && "border-primary",
                  isConfirmed && "bg-primary text-primary-foreground",
                  !isSelected &&
                    !isConfirmed &&
                    "bg-accent hover:bg-accent/80 text-accent-foreground"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex-1">{option.text}</span>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        isConfirmed ? "bg-primary-foreground" : "bg-primary"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          isConfirmed
                            ? "text-primary"
                            : "text-primary-foreground"
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {isSelected && !isConfirmed && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(0,0,0,0)",
                        "0 0 15px rgba(var(--primary),0.3)",
                        "0 0 0px rgba(0,0,0,0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      );
    }

    // Handle other question types
    switch (question.type) {
      case "text":
        return (
          <div className="motion-safe:motion-preset-fade motion-duration-200">
            <Input
              type="text"
              value={(responses[currentItem.id] as string) || ""}
              onChange={(e) => handleTextInput(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full"
            />
          </div>
        );

      case "slider":
        return (
          <div className="mt-6 space-y-8 motion-safe:motion-preset-fade motion-duration-200">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.minLabel}</span>
              <span>{question.maxLabel}</span>
            </div>
            <Slider
              value={[(responses[currentItem.id] as number) || question.min]}
              min={question.min}
              max={question.max}
              step={1}
              onValueChange={([value]) => handleSliderInput(value)}
              className="w-full"
            />
            <div className="text-center font-medium">
              {responses[currentItem.id] || question.min}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Main component render with layout sections
  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold text-foreground">
          {questionnaire.title}
        </h1>
        {questionnaire.subtitle && (
          <p className="text-sm text-muted-foreground mt-1">
            {questionnaire.subtitle}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          {currentIndex + 1} of {totalItems}
        </p>
      </div>

      {/* Content */}
      <div className="p-4">
        {currentItem.type === "section" ? (
          <div className="space-y-6 motion-safe:motion-preset-fade motion-duration-200">
            <h2 className="text-2xl font-semibold text-foreground">
              {currentItem.text}
            </h2>
            {currentItem.sectionInstructions && (
              <p className="text-muted-foreground whitespace-pre-wrap">
                {currentItem.sectionInstructions}
              </p>
            )}
            <div className="flex justify-center mt-8">
              <Button onClick={handleNext} size="lg">
                Start
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <motion.div
              className="motion-safe:motion-preset-slide motion-duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-3">
                {currentItem.sectionTitle && (
                  <div className="mb-2 text-sm font-medium text-muted-foreground motion-safe:motion-preset-fade motion-duration-200">
                    {currentItem.sectionTitle}
                  </div>
                )}
                {currentItem.sectionInstructions && (
                  <div className="mb-4 text-sm text-muted-foreground motion-safe:motion-preset-fade motion-duration-200">
                    {currentItem.sectionInstructions}
                  </div>
                )}

                <p className="text-lg font-medium text-foreground mb-6 motion-safe:motion-preset-fade motion-duration-200">
                  {currentItem.text}
                </p>

                {currentItem.question && renderQuestion(currentItem.question)}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {currentItem.type === "question" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
          <div className="flex justify-between items-center max-w-lg mx-auto">
            <Button
              variant="ghost"
              size="lg"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>
            {currentIndex === totalItems - 1 ? (
              <Button size="lg" onClick={handleSubmit} disabled={!isComplete()}>
                Submit
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="lg"
                onClick={handleNext}
                disabled={currentIndex === totalItems - 1}
              >
                Next
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
