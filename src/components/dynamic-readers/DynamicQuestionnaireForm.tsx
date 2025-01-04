/**
 * DynamicQuestionnaireForm Component
 *
 * A form component that dynamically renders different types of questions from a questionnaire.
 * Features include:
 * - Multiple question types (radio options, text input, slider)
 * - Conditional questions based on previous answers
 * - Local storage persistence
 * - Form validation
 * - Responsive layout
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Question, Questionnaire } from "@/lib/types/questionnaire.types";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

// Props interface for the component
interface DynamicQuestionnaireFormProps {
  questionnaire: Questionnaire;
  storageKey: string;
  onSubmit: () => void;
}

export function DynamicQuestionnaireForm({
  questionnaire,
  storageKey,
  onSubmit,
}: DynamicQuestionnaireFormProps) {
  // Store responses as key-value pairs where key is question ID
  const [responses, setResponses] = useState<Record<string, number | string>>(
    {}
  );

  // Handle response updates and clear dependent questions if conditions not met
  const handleResponse = (questionId: string, value: number | string) => {
    setResponses((prev) => {
      const newResponses = { ...prev, [questionId]: value };

      // Clear dependent responses when their condition is no longer met
      const dependentQuestions = questionnaire.sections
        .flatMap((section) => section.questions)
        .filter((q) => q.dependsOn?.questionId === questionId);

      dependentQuestions.forEach((question) => {
        if (value !== question.dependsOn?.expectedValue) {
          delete newResponses[question.id];
        }
      });

      return newResponses;
    });
  };

  // Save responses to localStorage and trigger onSubmit callback
  const handleSubmit = () => {
    localStorage.setItem(storageKey, JSON.stringify(responses));
    onSubmit();
  };

  // Check if all required questions are answered
  const isComplete = () => {
    const requiredQuestions = questionnaire.sections.flatMap((section) =>
      section.questions
        .filter((question) => {
          // If question has a dependency, check if it should be required
          if (question.dependsOn) {
            return (
              responses[question.dependsOn.questionId] ===
              question.dependsOn.expectedValue
            );
          }
          // If no dependency, it's always required
          return true;
        })
        .map((q) => q.id)
    );

    return requiredQuestions.every((q) => q in responses);
  };

  // Check if a conditional question should be displayed
  const shouldShowQuestion = (question: Question) => {
    if (!question.dependsOn) return true;
    return (
      responses[question.dependsOn.questionId] ===
      question.dependsOn.expectedValue
    );
  };

  // Render different question types (radio, text, slider)
  const renderQuestion = (question: Question) => {
    if (!shouldShowQuestion(question)) return null;

    // If the question has options, treat it as a regular question regardless of type
    if ("options" in question) {
      return (
        <RadioGroup
          value={responses[question.id]?.toString()}
          onValueChange={(value: string) => {
            const numValue = Number(value);
            const finalValue = isNaN(numValue) ? value : numValue;
            handleResponse(question.id, finalValue);
          }}
          className="bg-muted/30"
        >
          {question.options.map((option, optionIndex) => {
            const isSelected =
              responses[question.id]?.toString() === option.value.toString();
            return (
              <label
                key={optionIndex}
                htmlFor={`${question.id}-${optionIndex}`}
                className={cn(
                  "flex items-center justify-between w-full h-11 px-4 cursor-pointer",
                  "group transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  isSelected && "bg-accent/50 text-accent-foreground"
                )}
              >
                <div className="flex items-center space-x-4">
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`${question.id}-${optionIndex}`}
                    className={cn(
                      "h-5 w-5",
                      "border-muted-foreground/30",
                      "data-[state=checked]:border-primary data-[state=checked]:text-primary"
                    )}
                  />
                  <span className="text-sm">{option.text}</span>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                    "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5",
                    isSelected && "opacity-100"
                  )}
                />
              </label>
            );
          })}
        </RadioGroup>
      );
    }

    switch (question.type) {
      case "text":
        return (
          <div className="mt-2">
            <Input
              type="text"
              value={(responses[question.id] as string) || ""}
              onChange={(e) => handleResponse(question.id, e.target.value)}
              placeholder="Type your answer here..."
              className="max-w-md"
            />
          </div>
        );

      case "slider":
        return (
          <div className="mt-6 space-y-8">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.minLabel}</span>
              <span>{question.maxLabel}</span>
            </div>
            <Slider
              value={[(responses[question.id] as number) || question.min]}
              min={question.min}
              max={question.max}
              step={1}
              onValueChange={([value]) => handleResponse(question.id, value)}
              className="w-full"
            />
            <div className="text-center font-medium">
              {responses[question.id] || question.min}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Main component render with layout sections
  return (
    <div className="h-full overflow-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          {questionnaire.title}
        </h1>
        <h2 className="text-xl text-muted-foreground mb-4">
          {questionnaire.subtitle}
        </h2>
        <p className="text-muted-foreground mb-8 whitespace-pre-line">
          {questionnaire.instructions}
        </p>

        {questionnaire.sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="mb-8 p-6">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {section.title}
            </h3>
            <p className="text-muted-foreground mb-6 whitespace-pre-line">
              {section.instructions}
            </p>

            <div className="space-y-6">
              {section.questions.map((question) => (
                <div
                  key={question.id}
                  className="border-b border-border pb-4 last:border-0"
                >
                  <p className="mb-4 font-medium text-foreground">
                    {question.text}
                  </p>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>
          </Card>
        ))}

        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmit} disabled={!isComplete()} size="lg">
            Submit Questionnaire
          </Button>
        </div>
      </div>
    </div>
  );
}
