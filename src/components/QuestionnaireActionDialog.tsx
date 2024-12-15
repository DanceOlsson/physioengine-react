import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrCode, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionnaireActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questionnaireName: string;
  questionnaireId: string;
}

export function QuestionnaireActionDialog({
  open,
  onOpenChange,
  questionnaireName,
  questionnaireId,
}: QuestionnaireActionDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{questionnaireName}</DialogTitle>
          <DialogDescription>
            Choose how you would like to proceed with the questionnaire
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() =>
              navigate(`/questionnaires/${questionnaireId}/qr-generation`)
            }
          >
            <QrCode className="h-8 w-8" />
            <span>Generate QR Code</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => navigate(`/questionnaires/${questionnaireId}`)}
          >
            <FileText className="h-8 w-8" />
            <span>Fill Out Now</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
