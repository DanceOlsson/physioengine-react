import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, PencilLine, ArrowLeft } from "lucide-react";
import { type Questionnaire } from "./QuestionnaireList";

interface QuestionnaireActionPanelProps {
  questionnaire: Questionnaire;
  onActionSelect: (action: "qrCode" | "form") => void;
  onBack: () => void;
}

export function QuestionnaireActionPanel({
  questionnaire,
  onActionSelect,
  onBack,
}: QuestionnaireActionPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="md:hidden p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <Card className="w-full max-w-sm">
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">
              {questionnaire.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {questionnaire.description}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="w-full"
                size="lg"
                onClick={() => onActionSelect("form")}
              >
                <PencilLine className="mr-2 h-5 w-5" />
                Fill
              </Button>
              <Button
                className="w-full"
                size="lg"
                onClick={() => onActionSelect("qrCode")}
              >
                <QrCode className="mr-2 h-5 w-5" />
                QR Code
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
