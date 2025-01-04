import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Questionnaire } from "./QuestionnaireList";
import { DynamicQuestionnaireForm } from "@/components/dynamic-readers/DynamicQuestionnaireForm";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { QuestionnaireQrPanel } from "./QuestionnaireQrPanel";
import { MobileQuestionnaireReader } from "@/components/dynamic-readers/MobileQuestionnaireReader";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QuestionnaireActionPanel } from "./QuestionnaireActionPanel";
import { DynamicResultsReader } from "@/components/dynamic-readers/DynamicResultsReader";

// Import questionnaire data
import { questions as koosQuestions } from "@/assets/questionnaires/koos_swedish";
import { questions as hoosQuestions } from "@/assets/questionnaires/hoos_swedish";
import { questions as dashQuestions } from "@/assets/questionnaires/dash_swedish";
import { questions as satisfactionQuestions } from "@/assets/questionnaires/satisfaction_swedish";
import { questions as sefasQuestions } from "@/assets/questionnaires/sefas_swedish";
import { questions as eq5dQuestions } from "@/assets/questionnaires/EQ-5D-5L_swedish";

// Import calculators
import { calculateKoosScores } from "@/lib/calculators/koos";
import { calculateHoosScores } from "@/lib/calculators/hoos";
import { calculateDashScores } from "@/lib/calculators/dash";
import { calculateSatisfactionScore } from "@/lib/calculators/satisfaction";
import { calculateSefasScore } from "@/lib/calculators/sefas";
import { calculateEq5dScore } from "@/lib/calculators/eq5d";

export type PanelState =
  | "empty"
  | "action"
  | "form"
  | "qrCode"
  | "liveResults"
  | "finalResults";

interface QuestionnaireDynamicPanelProps {
  className?: string;
  questionnaire: Questionnaire | null;
  state: PanelState;
  onStateChange: (state: PanelState) => void;
  isQrEntry?: boolean;
  onBack?: () => void;
  onActionSelect?: (action: "qrCode" | "form") => void;
}

const getQuestionnaireData = (id: string) => {
  switch (id) {
    case "koos":
      return {
        data: koosQuestions[0],
        storageKey: "koosResponses",
        calculator: calculateKoosScores,
      };
    case "hoos":
      return {
        data: hoosQuestions[0],
        storageKey: "hoosResponses",
        calculator: calculateHoosScores,
      };
    case "dash":
      return {
        data: dashQuestions[0],
        storageKey: "dashResponses",
        calculator: calculateDashScores,
      };
    case "satisfaction":
      return {
        data: satisfactionQuestions[0],
        storageKey: "satisfactionResponses",
        calculator: calculateSatisfactionScore,
      };
    case "sefas":
      return {
        data: sefasQuestions[0],
        storageKey: "sefasResponses",
        calculator: calculateSefasScore,
      };
    case "eq5d":
      return {
        data: eq5dQuestions[0],
        storageKey: "eq5dResponses",
        calculator: calculateEq5dScore,
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
  isQrEntry = false,
  onBack,
  onActionSelect,
}: QuestionnaireDynamicPanelProps) {
  const [showResults, setShowResults] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showExitWarning, setShowExitWarning] = useState(false);

  // Reset state when questionnaire changes
  useEffect(() => {
    setShowResults(false);
    // Force the panel to action state when questionnaire changes
    if (questionnaire) {
      onStateChange("action");
    }
  }, [questionnaire, onStateChange]);

  useEffect(() => {
    const handleStorageChange = () => {
      setShowResults(false);
      onStateChange("form");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [onStateChange]);

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

  const { data, storageKey, calculator } = questionnaireData;
  const storedResponses = localStorage.getItem(storageKey);
  const responses = storedResponses ? JSON.parse(storedResponses) : null;
  const result = responses ? calculator(responses) : null;

  const handleFormSubmit = () => {
    setShowResults(true);
    onStateChange("finalResults");
  };

  const handleBack = () => {
    if (onBack) {
      if (state === "form" && !showResults) {
        setShowExitWarning(true);
      } else {
        onBack();
      }
    } else {
      setShowResults(false);
      onStateChange("form");
    }
  };

  const handleConfirmExit = () => {
    setShowExitWarning(false);
    onBack?.();
  };

  return (
    <div
      className={cn(
        "h-full",
        "bg-background",
        !isMobile && "border-l",
        className
      )}
    >
      <AlertDialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Questionnaire?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you exit now. Are you sure you want
              to go back to the questionnaire list?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Questionnaire</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit}>
              Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {state === "action" && questionnaire && (
        <QuestionnaireActionPanel
          questionnaire={questionnaire}
          onActionSelect={onActionSelect!}
          onBack={onBack!}
        />
      )}

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
                  Previous Step
                </Button>
              </div>
              <div className="p-6">
                {result && (
                  <DynamicResultsReader
                    questionnaireId={questionnaire.id.toUpperCase()}
                    result={result}
                  />
                )}
              </div>
            </div>
          ) : isMobile ? (
            <div className="h-full">
              {!isQrEntry && (
                <div className="sticky top-0 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Exit Questionnaire
                    </Button>
                  </div>
                </div>
              )}
              <MobileQuestionnaireReader
                questionnaire={data}
                onSubmit={handleFormSubmit}
              />
            </div>
          ) : (
            <DynamicQuestionnaireForm
              questionnaire={data}
              storageKey={storageKey}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      )}

      {state === "qrCode" && questionnaire && (
        <QuestionnaireQrPanel
          questionnaire={questionnaire}
          onBack={onBack!}
          onResponseReceived={() => {
            setShowResults(true);
            onStateChange("liveResults");
          }}
        />
      )}

      {state === "liveResults" && (
        <div className="animate-in slide-in-from-right h-full overflow-auto">
          {!isQrEntry && isMobile && (
            <div className="sticky top-0 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="mr-2 h-4 w-4" />
                Exit Questionnaire
              </Button>
            </div>
          )}
          <div className="p-6">
            {result && (
              <DynamicResultsReader
                questionnaireId={questionnaire.id.toUpperCase()}
                result={result}
              />
            )}
          </div>
        </div>
      )}

      {state === "finalResults" && (
        <div className="animate-in slide-in-from-right h-full overflow-auto">
          {!isQrEntry && isMobile && (
            <div className="sticky top-0 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="mr-2 h-4 w-4" />
                Exit Questionnaire
              </Button>
            </div>
          )}
          <div className="p-6">
            {result && (
              <DynamicResultsReader
                questionnaireId={questionnaire.id.toUpperCase()}
                result={result}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
