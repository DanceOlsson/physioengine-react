import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuestionnaireWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function QuestionnaireWarningDialog({
  open,
  onOpenChange,
  onConfirm,
}: QuestionnaireWarningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Switch Questionnaire?</DialogTitle>
          <DialogDescription>
            You have an active questionnaire session. Are you sure you want to
            switch questionnaires?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Switch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
