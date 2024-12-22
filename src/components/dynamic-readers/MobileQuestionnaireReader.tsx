import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleResponse = (value: number | string) => {
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

    // Auto-advance to next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
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

  const handleSubmit = () => {
    onSubmit(responses);
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
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          {currentQuestion.sectionTitle}
        </div>
        <p className="text-lg font-medium text-foreground mb-6">
          {currentQuestion.text}
        </p>

        {currentQuestion.type === "text" ? (
          <Input
            type="text"
            value={(responses[currentQuestion.id] as string) || ""}
            onChange={(e) => handleResponse(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full"
          />
        ) : (
          <RadioGroup
            value={responses[currentQuestion.id]?.toString()}
            onValueChange={(value: string) => {
              const numValue = Number(value);
              const finalValue = isNaN(numValue) ? value : numValue;
              handleResponse(finalValue);
            }}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center space-x-3 rounded-lg border p-4"
              >
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`${currentQuestion.id}-${optionIndex}`}
                />
                <Label
                  htmlFor={`${currentQuestion.id}-${optionIndex}`}
                  className="flex-1"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isComplete()}
              className="ml-auto"
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              disabled={currentQuestionIndex === totalQuestions - 1}
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
