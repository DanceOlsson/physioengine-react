import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { KoosQuestionnaire, KoosResponse } from "@/lib/types/koos.types";

interface QuestionnaireFormProps {
  questionnaire: KoosQuestionnaire;
  storageKey: string;
  resultsPath: string;
}

export function QuestionnaireForm({
  questionnaire,
  storageKey,
  resultsPath,
}: QuestionnaireFormProps) {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<KoosResponse>({});

  const handleResponse = (questionId: string, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem(storageKey, JSON.stringify(responses));
    navigate(resultsPath);
  };

  const isComplete = () => {
    const totalQuestions = questionnaire.sections.reduce(
      (total, section) => total + section.questions.length,
      0
    );
    return Object.keys(responses).length === totalQuestions;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          {questionnaire.title}
        </h1>
        <h2 className="text-xl text-muted-foreground mb-4">
          {questionnaire.subtitle}
        </h2>
        <p className="text-muted-foreground mb-8">
          {questionnaire.instructions}
        </p>

        {questionnaire.sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="mb-8 p-6">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {section.title}
            </h3>
            <p className="text-muted-foreground mb-6">{section.instructions}</p>

            <div className="space-y-6">
              {section.questions.map((question) => (
                <div
                  key={question.id}
                  className="border-b border-border pb-4 last:border-0"
                >
                  <p className="mb-4 font-medium text-foreground">
                    {question.text}
                  </p>
                  <RadioGroup
                    value={responses[question.id]?.toString()}
                    onValueChange={(value: string) =>
                      handleResponse(question.id, parseInt(value))
                    }
                  >
                    <div className="grid gap-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.value.toString()}
                            id={`${question.id}-${optionIndex}`}
                          />
                          <Label
                            htmlFor={`${question.id}-${optionIndex}`}
                            className="text-foreground"
                          >
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
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
