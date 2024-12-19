import { Button } from "@/components/ui/button";
import { QrCode, PencilLine } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface QuestionnaireActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questionnaireName: string;
  onActionSelect: (action: "qrCode" | "form") => void;
  buttonPosition: { top: number; right: number } | null;
}

export function QuestionnaireActionDialog({
  open,
  onOpenChange,
  questionnaireName,
  onActionSelect,
  buttonPosition,
}: QuestionnaireActionDialogProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (buttonPosition) {
      // Calculate available space to the right
      const availableRight = window.innerWidth - buttonPosition.right - 16; // 16px gap
      const dialogWidth = 300; // Reduced width

      // If not enough space on the right, position to the left
      const left =
        availableRight < dialogWidth
          ? buttonPosition.right - dialogWidth - 16
          : buttonPosition.right + 16;

      // Ensure the dialog stays within vertical bounds
      const dialogHeight = isMobile ? 180 : 300; // Approximate height
      const top = Math.min(
        Math.max(0, buttonPosition.top - dialogHeight / 3),
        window.innerHeight - dialogHeight
      );

      setPosition({ top, left });
    }
  }, [buttonPosition, isMobile]);

  if (!buttonPosition || !position) return null;

  return (
    <div
      className={cn(
        "fixed bg-background border shadow-lg rounded-lg w-[300px] transform transition-all duration-300 ease-in-out z-50",
        open
          ? "translate-x-0 opacity-100"
          : "translate-x-[-8px] opacity-0 pointer-events-none"
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{questionnaireName}</h2>
          <p className="text-sm text-muted-foreground">Choose how to proceed</p>
        </div>

        <div className="space-y-2">
          {!isMobile && (
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-2"
              onClick={() => {
                onActionSelect("qrCode");
                onOpenChange(false);
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              <div>
                <div className="font-medium">QR Code</div>
                <div className="text-xs text-muted-foreground">
                  Generate code for remote access
                </div>
              </div>
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full justify-start h-auto py-2"
            onClick={() => {
              onActionSelect("form");
              onOpenChange(false);
            }}
          >
            <PencilLine className="h-4 w-4 mr-2" />
            <div>
              <div className="font-medium">Fill Directly</div>
              <div className="text-xs text-muted-foreground">
                Fill in the questionnaire now
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
