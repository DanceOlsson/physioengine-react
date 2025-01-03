import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Question, Questionnaire } from "@/lib/types/questionnaire.types";

interface MobileQuestionnaireReaderProps {
  questionnaire: Questionnaire;
  onSubmit: (responses: Record<string, number | string>) => void;
}

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
  // Flatten sections and questions for single-item view
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

  const handleOptionSelect = (value: string | number) => {
    if (selectedOption === value) {
      setResponses((prev) => {
        const newResponses = { ...prev, [currentItem.id]: value };

        // Clear dependent responses when their condition is no longer met
        allItems.forEach((item) => {
          if (
            item.type === "question" &&
            item.question?.dependsOn?.questionId === currentItem.id
          ) {
            if (value !== item.question.dependsOn.expectedValue) {
              delete newResponses[item.id];
            }
          }
        });

        return newResponses;
      });

      if (currentIndex < totalItems - 1) {
        setTimeout(() => {
          setSelectedOption(null);
          setCurrentIndex((prev) => prev + 1);
        }, 400);
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
    // Filter out section responses before submitting
    const questionResponses = Object.fromEntries(
      Object.entries(responses).filter(([key]) => !key.startsWith("section-"))
    );
    onSubmit(questionResponses);
  };

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

  const renderQuestion = (question: Question) => {
    // If question has options, it's a regular question regardless of type
    if ("options" in question) {
      return (
        <div className="space-y-3 motion-safe:motion-preset-fade motion-duration-200">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.value;
            const isConfirmed = responses[currentItem.id] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                type="button"
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left",
                  "transition-colors duration-200",
                  "active:scale-[0.98]",
                  isSelected &&
                    !isConfirmed && [
                      "bg-white/10 dark:bg-white/10",
                      "text-foreground",
                      "ring-1 ring-white/30",
                      "motion-safe:animate-[shimmer_2s_ease-in-out_infinite]",
                    ],
                  isConfirmed && [
                    "bg-white dark:bg-white/10",
                    "text-foreground",
                    "motion-safe:motion-preset-confetti",
                  ],
                  !isSelected &&
                    !isConfirmed && [
                      "bg-accent hover:bg-accent/80",
                      "text-accent-foreground",
                    ]
                )}
              >
                <span className="flex-1">{option.text}</span>
              </button>
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

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
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
            <div className="motion-safe:motion-preset-slide motion-duration-200">
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
            </div>
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
