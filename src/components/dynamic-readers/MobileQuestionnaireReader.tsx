import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MobileQuestionnaireReaderProps {
  questionnaire: {
    title: string;
    subtitle: string;
    instructions: string;
    sections: Array<{
      title: string;
      instructions: string;
      questions: Array<{
        id: string;
        text: string;
        type?: "text";
        options?: Array<{
          value: string | number;
          text: string;
        }>;
        dependsOn?: {
          questionId: string;
          expectedValue: string | number;
        };
      }>;
    }>;
  };
  onSubmit: (responses: Record<string, number | string>) => void;
}

type QuestionOrSection = {
  type: "question" | "section";
  id: string;
  text: string;
  sectionTitle?: string;
  sectionInstructions?: string;
  questionOptions?: Array<{
    value: string | number;
    text: string;
  }>;
  questionType?: "text";
  dependsOn?: {
    questionId: string;
    expectedValue: string | number;
  };
};

export function MobileQuestionnaireReader({
  questionnaire,
  onSubmit,
}: MobileQuestionnaireReaderProps) {
  // Flatten sections and questions for single-item view
  const allItems: QuestionOrSection[] = questionnaire.sections.flatMap(
    (section) => {
      const sectionItem: QuestionOrSection = {
        type: "section",
        id: `section-${section.title}`,
        text: section.title,
        sectionInstructions: section.instructions,
      };

      const questions: QuestionOrSection[] = section.questions.map((q) => ({
        type: "question",
        id: q.id,
        text: q.text,
        sectionTitle: section.title,
        questionType: q.type,
        questionOptions: q.options,
        dependsOn: q.dependsOn,
      }));

      return section.instructions ? [sectionItem, ...questions] : questions;
    }
  );

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
            item.dependsOn?.questionId === currentItem.id
          ) {
            if (value !== item.dependsOn.expectedValue) {
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
        if (item.dependsOn) {
          return (
            responses[item.dependsOn.questionId] ===
            item.dependsOn.expectedValue
          );
        }
        return true;
      })
      .map((q) => q.id);

    return requiredQuestions.every((q) => q in responses);
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

                <p className="text-lg font-medium text-foreground mb-6 motion-safe:motion-preset-fade motion-duration-200">
                  {currentItem.text}
                </p>

                {currentItem.questionType === "text" ? (
                  <div className="motion-safe:motion-preset-fade motion-duration-200">
                    <Input
                      type="text"
                      value={(responses[currentItem.id] as string) || ""}
                      onChange={(e) => handleTextInput(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="space-y-3 motion-safe:motion-preset-fade motion-duration-200">
                    {currentItem.questionOptions?.map((option) => {
                      const isSelected = selectedOption === option.value;
                      const isConfirmed =
                        responses[currentItem.id] === option.value;

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
                                "bg-muted/50 dark:bg-white/5",
                                "hover:bg-white/10 dark:hover:bg-white/10",
                              ]
                          )}
                        >
                          <div className="flex-1">{option.text}</div>
                          {(isSelected || isConfirmed) && (
                            <div
                              className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2",
                                isConfirmed
                                  ? "bg-white/20"
                                  : "bg-white/20 motion-safe:motion-preset-bounce"
                              )}
                            >
                              <ChevronRight
                                className={cn("h-4 w-4", "text-white")}
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="motion-safe:motion-preset-slide"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentIndex === totalItems - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isComplete()}
              className="ml-auto motion-safe:motion-preset-slide"
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={handleNext}
              className="ml-auto motion-safe:motion-preset-slide"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
