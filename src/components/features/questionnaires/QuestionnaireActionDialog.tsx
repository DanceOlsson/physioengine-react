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
  const isCompact = useMediaQuery("(max-width: 400px)");
  const isVeryCompact = useMediaQuery("(max-width: 350px)");
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (buttonPosition) {
      // Calculate available space to the right
      const availableRight = window.innerWidth - buttonPosition.right - 16; // 16px gap
      const dialogWidth = isVeryCompact ? 120 : isCompact ? 200 : 300; // Adjust width based on screen size

      // If not enough space on the right, position to the left
      const left =
        availableRight < dialogWidth
          ? buttonPosition.right - dialogWidth - 16
          : buttonPosition.right + 16;

      // Ensure the dialog stays within vertical bounds
      const dialogHeight = isMobile ? 140 : 200; // Reduced heights
      const top = Math.min(
        Math.max(0, buttonPosition.top - dialogHeight / 3),
        window.innerHeight - dialogHeight
      );

      setPosition({ top, left });
    }
  }, [buttonPosition, isMobile, isCompact, isVeryCompact]);

  if (!buttonPosition || !position) return null;

  return (
    <div
      className={cn(
        "fixed bg-background border shadow-lg rounded-lg transform transition-all duration-300 ease-in-out z-50",
        isVeryCompact ? "w-[120px]" : isCompact ? "w-[200px]" : "w-[300px]",
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
        {!isVeryCompact && (
          <div className="mb-2 text-center">
            <h2 className="font-semibold text-base">{questionnaireName}</h2>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 flex flex-col items-center p-3 h-auto"
            onClick={() => {
              onActionSelect("qrCode");
              onOpenChange(false);
            }}
          >
            <QrCode className="h-5 w-5 mb-1" />
            <span className="text-xs">QR Code</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex flex-col items-center p-3 h-auto"
            onClick={() => {
              onActionSelect("form");
              onOpenChange(false);
            }}
          >
            <PencilLine className="h-5 w-5 mb-1" />
            <span className="text-xs">Fill</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
