import { Card } from "@/components/ui/card";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  category:
    | "upper-extremity"
    | "hip"
    | "knee"
    | "foot-ankle"
    | "neck-back"
    | "concussion"
    | "general"
    | "lower-extremity";
}

interface QuestionnaireListProps {
  className?: string;
  questionnaires: Questionnaire[];
  selectedQuestionnaire: Questionnaire | null;
  onQuestionnaireSelect: (
    questionnaire: Questionnaire,
    buttonRect: { top: number; right: number }
  ) => void;
  isPanelOpen: boolean;
}

export function QuestionnaireList({
  className,
  questionnaires,
  selectedQuestionnaire,
  onQuestionnaireSelect,
  isPanelOpen,
}: QuestionnaireListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleQuestionnaireClick = (
    questionnaire: Questionnaire,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const listRect = listRef.current?.getBoundingClientRect();

    if (listRect) {
      onQuestionnaireSelect(questionnaire, {
        top: rect.top,
        right: rect.right,
      });
    }
  };

  return (
    <div
      className={cn(
        "h-full bg-background relative w-full max-w-full",
        className
      )}
      ref={listRef}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Questionnaires
        </h2>
        <p className="text-muted-foreground">Select a questionnaire to begin</p>
      </div>

      <ScrollArea.Root className="h-[calc(100vh-10rem)]">
        <ScrollArea.Viewport className="h-full w-full px-6 pb-6">
          <div
            className={cn(
              "grid gap-4 pt-1",
              isPanelOpen
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {questionnaires.map((questionnaire) => (
              <div
                key={questionnaire.id}
                onClick={(e) => handleQuestionnaireClick(questionnaire, e)}
                className="cursor-pointer relative"
              >
                <Card
                  className={cn(
                    "p-4 h-full transition-all duration-200 hover:ring-1 hover:ring-primary hover:bg-accent/50",
                    selectedQuestionnaire?.id === questionnaire.id &&
                      "ring-2 ring-primary shadow-md"
                  )}
                >
                  <div className="flex flex-col h-full min-h-[120px]">
                    <h3 className="text-lg font-semibold text-foreground">
                      {questionnaire.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground flex-grow">
                      {questionnaire.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                        {questionnaire.category}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-accent p-0.5 transition-colors hover:bg-accent/80"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-muted-foreground/30" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
