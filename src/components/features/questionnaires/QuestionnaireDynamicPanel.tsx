import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Questionnaire } from "./QuestionnaireList";
import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Import questionnaire data
import { questions as koosQuestions } from "@/assets/questionnaires/koos_swedish";
import { questions as hoosQuestions } from "@/assets/questionnaires/hoos_swedish";
import { questions as dashQuestions } from "@/assets/questionnaires/dash_swedish";
import { questions as satisfactionQuestions } from "@/assets/questionnaires/satisfaction_swedish";

// Import result pages
import { KoosResultsPage } from "@/pages/questionnaires/koos/KoosResultsPage";
import { HoosResultsPage } from "@/pages/questionnaires/hoos/HoosResultsPage";
import { DashResultsPage } from "@/pages/questionnaires/dash/DashResultsPage";
import { SatisfactionResultsPage } from "@/pages/questionnaires/satisfaction/SatisfactionResultsPage";

export type PanelState =
  | "empty"
  | "form"
  | "qrCode"
  | "liveResults"
  | "finalResults";

interface QuestionnaireDynamicPanelProps {
  className?: string;
  questionnaire: Questionnaire | null;
  state: PanelState;
  onStateChange: (state: PanelState) => void;
}

const getQuestionnaireData = (id: string) => {
  switch (id) {
    case "koos":
      return {
        data: koosQuestions[0],
        storageKey: "koosResponses",
        ResultsComponent: KoosResultsPage,
      };
    case "hoos":
      return {
        data: hoosQuestions[0],
        storageKey: "hoosResponses",
        ResultsComponent: HoosResultsPage,
      };
    case "dash":
      return {
        data: dashQuestions[0],
        storageKey: "dashResponses",
        ResultsComponent: DashResultsPage,
      };
    case "satisfaction":
      return {
        data: satisfactionQuestions[0],
        storageKey: "satisfactionResponses",
        ResultsComponent: SatisfactionResultsPage,
      };
    default:
      return null;
  }
};

export function QuestionnaireDynamicPanel({
  className,
  questionnaire,
  state,
  onStateChange,
}: QuestionnaireDynamicPanelProps) {
  const [showResults, setShowResults] = useState(false);

  if (!questionnaire) {
    return (
      <div
        className={cn(
          "flex h-full items-center justify-center bg-background p-6",
          className
        )}
      >
        <Card className="flex aspect-square w-full max-w-md flex-col items-center justify-center p-6 text-center">
          <h3 className="text-xl font-semibold">No Questionnaire Selected</h3>
          <p className="mt-2 text-muted-foreground">
            Select a questionnaire from the list to get started
          </p>
        </Card>
      </div>
    );
  }

  const questionnaireData = getQuestionnaireData(questionnaire.id);
  if (!questionnaireData) return null;

  const { data, storageKey, ResultsComponent } = questionnaireData;

  const handleFormSubmit = () => {
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className={cn("h-full bg-background border-l", className)}>
      {state === "empty" && (
        <div className="flex h-full items-center justify-center p-6">
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-semibold">{questionnaire.title}</h3>
            <p className="mt-2 text-muted-foreground">
              {questionnaire.description}
            </p>
          </Card>
        </div>
      )}

      {state === "form" && (
        <div className="animate-in slide-in-from-right h-full">
          {showResults ? (
            <div className="h-full overflow-auto">
              <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Form
                </Button>
              </div>
              <div className="p-6">
                <ResultsComponent />
              </div>
            </div>
          ) : (
            <QuestionnaireForm
              questionnaire={data}
              storageKey={storageKey}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      )}

      {state === "qrCode" && (
        <div className="animate-in slide-in-from-right h-full">
          <Card className="m-6 p-6">
            <h3 className="text-xl font-semibold mb-4">QR Code</h3>
            <p className="text-muted-foreground">
              QR code generation will be implemented here
            </p>
          </Card>
        </div>
      )}

      {state === "liveResults" && (
        <div className="animate-in slide-in-from-right h-full overflow-auto">
          <div className="p-6">
            <ResultsComponent />
          </div>
        </div>
      )}

      {state === "finalResults" && (
        <div className="animate-in slide-in-from-right h-full overflow-auto">
          <div className="p-6">
            <ResultsComponent />
          </div>
        </div>
      )}
    </div>
  );
}
