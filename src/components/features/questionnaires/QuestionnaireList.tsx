import { Card } from "@/components/ui/card";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

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
    <div className="h-full bg-background flex flex-col" ref={listRef}>
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold text-foreground">
          Questionnaires
        </h2>
        <p className="text-muted-foreground">Select a questionnaire to begin</p>
      </div>

      <ScrollArea.Root className="flex-1">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="divide-y">
            {questionnaires.map((questionnaire) => (
              <div
                key={questionnaire.id}
                onClick={(e) => handleQuestionnaireClick(questionnaire, e)}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "group flex items-center justify-between p-4 transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    selectedQuestionnaire?.id === questionnaire.id &&
                      "bg-accent/50 text-accent-foreground"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <div className="min-w-0">
                        <h3 className="text-base font-medium leading-none truncate">
                          {questionnaire.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-1">
                          {questionnaire.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                        {questionnaire.category}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-accent p-0.5 transition-colors duration-150 ease-out hover:bg-accent/80"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-accent-foreground/20" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
