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

export function MobileQuestionnaireReader({
  questionnaire,
  onSubmit,
}: MobileQuestionnaireReaderProps) {
  // Flatten questions for single-question view
  const allQuestions = questionnaire.sections.flatMap((section) =>
    section.questions.map((q) => ({
      ...q,
      sectionTitle: section.title,
    }))
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number | string>>(
    {}
  );
  const [selectedOption, setSelectedOption] = useState<string | number | null>(
    null
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (value: string | number) => {
    if (selectedOption === value) {
      // Confirm selection and move to next question
      setResponses((prev) => {
        const newResponses = { ...prev, [currentQuestion.id]: value };

        // Clear dependent responses when their condition is no longer met
        allQuestions.forEach((question) => {
          if (question.dependsOn?.questionId === currentQuestion.id) {
            if (value !== question.dependsOn.expectedValue) {
              delete newResponses[question.id];
            }
          }
        });

        return newResponses;
      });

      // Wait for the confetti animation to play before moving to next question
      if (currentQuestionIndex < totalQuestions - 1) {
        // Wait 400ms to see the full confetti animation
        setTimeout(() => {
          setSelectedOption(null);
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 400);
      }
    } else {
      setSelectedOption(value);
    }
  };

  const handleTextInput = (value: string) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(null);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setSelectedOption(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(responses);
  };

  const isComplete = () => {
    const requiredQuestions = allQuestions
      .filter((question) => {
        if (question.dependsOn) {
          return (
            responses[question.dependsOn.questionId] ===
            question.dependsOn.expectedValue
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
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
      </div>

      {/* Question */}
      <div className="p-4">
        <div className="mb-2 text-sm font-medium text-muted-foreground motion-safe:motion-preset-fade motion-duration-200">
          {currentQuestion.sectionTitle}
        </div>

        <div className="relative">
          <div className="motion-safe:motion-preset-slide motion-duration-200">
            <div className="space-y-3">
              <p className="text-lg font-medium text-foreground mb-6 motion-safe:motion-preset-fade motion-duration-200">
                {currentQuestion.text}
              </p>

              {currentQuestion.type === "text" ? (
                <div className="motion-safe:motion-preset-fade motion-duration-200">
                  <Input
                    type="text"
                    value={(responses[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleTextInput(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="space-y-3 motion-safe:motion-preset-fade motion-duration-200">
                  {currentQuestion.options?.map((option) => {
                    const isSelected = selectedOption === option.value;
                    const isConfirmed =
                      responses[currentQuestion.id] === option.value;

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
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="motion-safe:motion-preset-slide"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentQuestionIndex === totalQuestions - 1 ? (
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
              disabled={!responses[currentQuestion.id]}
              className="motion-safe:motion-preset-slide"
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
