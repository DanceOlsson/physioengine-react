import { Card } from "@/components/ui/card";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  category: "knee" | "hip" | "arm" | "general";
}

interface QuestionnaireListProps {
  className?: string;
  questionnaires: Questionnaire[];
  selectedQuestionnaire: Questionnaire | null;
  onQuestionnaireSelect: (
    questionnaire: Questionnaire,
    buttonRect: { top: number; right: number }
  ) => void;
}

export function QuestionnaireList({
  className,
  questionnaires,
  selectedQuestionnaire,
  onQuestionnaireSelect,
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
      className={cn("h-full bg-background relative max-w-md", className)}
      ref={listRef}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-foreground">
          Questionnaires
        </h2>
        <p className="text-muted-foreground">Select a questionnaire to begin</p>
      </div>

      <ScrollArea.Root className="h-[calc(100vh-10rem)]">
        <ScrollArea.Viewport className="h-full w-full px-6">
          <div className="grid gap-3">
            {questionnaires.map((questionnaire) => (
              <div
                key={questionnaire.id}
                onClick={(e) => handleQuestionnaireClick(questionnaire, e)}
                className="cursor-pointer relative"
              >
                <Card
                  className={cn(
                    "p-4 transition-all hover:shadow-md",
                    selectedQuestionnaire?.id === questionnaire.id &&
                      "border-primary shadow-md"
                  )}
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {questionnaire.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {questionnaire.description}
                  </p>
                  <div className="mt-3">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                      {questionnaire.category}
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-zinc-100 p-0.5 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
