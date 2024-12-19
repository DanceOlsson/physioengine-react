import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Questionnaire } from "./QuestionnaireList";

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

export function QuestionnaireDynamicPanel({
  className,
  questionnaire,
  state,
  onStateChange,
}: QuestionnaireDynamicPanelProps) {
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

  return (
    <div className={cn("h-full overflow-hidden bg-background p-6", className)}>
      {state === "empty" && (
        <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
          <h3 className="text-xl font-semibold">{questionnaire.title}</h3>
          <p className="mt-2 text-muted-foreground">
            {questionnaire.description}
          </p>
          {/* Add action buttons here based on available features */}
        </Card>
      )}

      {state === "form" && (
        <div className="animate-in slide-in-from-right">
          {/* Add QuestionnaireForm component here */}
          <h3>Form State - {questionnaire.title}</h3>
        </div>
      )}

      {state === "qrCode" && (
        <div className="animate-in slide-in-from-right">
          {/* Add QR code generation component here */}
          <h3>QR Code State - {questionnaire.title}</h3>
        </div>
      )}

      {state === "liveResults" && (
        <div className="animate-in slide-in-from-right">
          {/* Add live results component here */}
          <h3>Live Results State - {questionnaire.title}</h3>
        </div>
      )}

      {state === "finalResults" && (
        <div className="animate-in slide-in-from-right">
          {/* Add final results component here */}
          <h3>Final Results State - {questionnaire.title}</h3>
        </div>
      )}
    </div>
  );
}
