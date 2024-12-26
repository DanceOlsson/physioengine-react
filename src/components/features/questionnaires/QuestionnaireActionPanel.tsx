import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, PencilLine } from "lucide-react";
import { type Questionnaire } from "./QuestionnaireList";

interface QuestionnaireActionPanelProps {
  questionnaire: Questionnaire;
  onActionSelect: (action: "qrCode" | "form") => void;
}

export function QuestionnaireActionPanel({
  questionnaire,
  onActionSelect,
}: QuestionnaireActionPanelProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
      <Card className="w-full max-w-sm">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">{questionnaire.title}</h3>
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
  );
}
