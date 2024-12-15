import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import koosQuestionnaire from "@/data/koos_swedish.json";
import {
  KoosResponse,
  QuestionnaireSection,
  Question,
  QuestionOption,
  KoosQuestionnaire,
} from "@/lib/types/koos";

export function KoosQuestionnairePage() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<KoosResponse>({});
  const questionnaire = koosQuestionnaire[0];

  const handleResponse = (questionId: string, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem("koosResponses", JSON.stringify(responses));
    navigate("results");
  };

  const isComplete = () => {
    const totalQuestions = questionnaire.sections.reduce(
      (total: number, section: QuestionnaireSection) =>
        total + section.questions.length,
      0
    );
    return Object.keys(responses).length === totalQuestions;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{questionnaire.title}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{questionnaire.subtitle}</h2>
        <p className="text-gray-700 mb-8">{questionnaire.instructions}</p>

        {questionnaire.sections.map(
          (section: QuestionnaireSection, sectionIndex: number) => (
            <Card key={sectionIndex} className="mb-8 p-6">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-600 mb-6">{section.instructions}</p>

              <div className="space-y-6">
                {section.questions.map((question: Question) => (
                  <div
                    key={question.id}
                    className="border-b pb-4 last:border-0"
                  >
                    <p className="mb-4 font-medium">{question.text}</p>
                    <RadioGroup
                      value={responses[question.id]?.toString()}
                      onValueChange={(value: string) =>
                        handleResponse(question.id, parseInt(value))
                      }
                    >
                      <div className="grid gap-4">
                        {question.options.map(
                          (option: QuestionOption, optionIndex: number) => (
                            <div
                              key={optionIndex}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option.value.toString()}
                                id={`${question.id}-${optionIndex}`}
                              />
                              <Label htmlFor={`${question.id}-${optionIndex}`}>
                                {option.text}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </Card>
          )
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmit} disabled={!isComplete()} size="lg">
            Submit Questionnaire
          </Button>
        </div>
      </div>
    </div>
  );
}
