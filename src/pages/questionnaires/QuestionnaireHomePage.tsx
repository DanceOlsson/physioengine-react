import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";
import { QuestionnaireSidebar } from "@/components/features/questionnaires/QuestionnaireSidebar";
import {
  QuestionnaireList,
  type Questionnaire,
} from "@/components/features/questionnaires/QuestionnaireList";
import {
  QuestionnaireDynamicPanel,
  type PanelState,
} from "@/components/features/questionnaires/QuestionnaireDynamicPanel";
import { useBeforeUnload } from "@/hooks/use-before-unload.ts";
import { QuestionnaireWarningDialog } from "@/components/features/questionnaires/QuestionnaireWarningDialog";
import { cn } from "@/lib/utils";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft, ChevronRight } from "lucide-react";

const questionnaires: Questionnaire[] = [
  {
    id: "koos",
    title: "KOOS",
    description: "Knee injury and Osteoarthritis Outcome Score",
    category: "knee",
  },
  {
    id: "hoos",
    title: "HOOS",
    description: "Hip disability and Osteoarthritis Outcome Score",
    category: "hip",
  },
  {
    id: "dash",
    title: "DASH",
    description: "Disabilities of the Arm, Shoulder and Hand",
    category: "upper-extremity",
  },
  {
    id: "satisfaction",
    title: "Patient Satisfaction",
    description: "Brief survey about your healthcare experience",
    category: "general",
  },
  {
    id: "sefas",
    title: "SEFAS",
    description: "Self-reported Foot and Ankle Score",
    category: "foot-ankle",
  },
  {
    id: "eq5d",
    title: "EQ-5D-5L",
    description: "Health-Related Quality of Life Questionnaire",
    category: "general",
  },
];

const MIN_PANEL_SIZE = 20;

export function QuestionnaireHomePage() {
  // Responsive state
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);

  // Filter and panel state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire | null>(null);
  const [panelState, setPanelState] = useState<PanelState>("empty");
  const [isQrEntry, setIsQrEntry] = useState(false);

  // Filter questionnaires based on selected category
  const filteredQuestionnaires = selectedCategory
    ? questionnaires.filter((q) => q.category === selectedCategory)
    : questionnaires;

  // Dialog states
  const [showWarningDialog, setShowWarningDialog] = useState(false);

  // Handle navigation protection
  const shouldPreventNavigation =
    panelState === "form" ||
    panelState === "qrCode" ||
    panelState === "liveResults";
  useBeforeUnload(
    shouldPreventNavigation,
    "You have an active questionnaire session. Are you sure you want to leave?"
  );

  const handleQuestionnaireSelect = (
    questionnaire: Questionnaire,
    position: { top: number; right: number }
  ) => {
    if (shouldPreventNavigation) {
      setShowWarningDialog(true);
      return;
    }

    setSelectedQuestionnaire(questionnaire);
    setPanelState("action");
  };

  const handleBack = () => {
    // Always go back to list
    setSelectedQuestionnaire(null);
    setPanelState("empty");
  };

  const handleWarningConfirm = () => {
    setShowWarningDialog(false);
    setPanelState("action");
  };

  const handleActionSelect = (action: "qrCode" | "form") => {
    setIsQrEntry(action === "qrCode");
    setPanelState(action);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar - hidden on mobile except for hamburger */}
      <div
        className={cn(
          // Mobile: fixed under header
          "fixed top-[64px] left-0 z-40",
          // Desktop: fixed position with responsive header height
          "2xl:top-[80px] 3xl:top-[96px]",
          // Height matches header offset
          "h-[calc(100vh-64px)] 2xl:h-[calc(100vh-80px)] 3xl:h-[calc(100vh-96px)]",
          // Width handling
          isSidebarCollapsed ? "w-20" : "w-64",
          !isSidebarCollapsed && "2xl:w-[350px]"
        )}
      >
        {/* Only show hamburger when sidebar is collapsed on mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarCollapsed(false)}
          className={cn(
            "md:hidden absolute top-2 left-2 z-50 h-10 w-10",
            (!isSidebarCollapsed || selectedQuestionnaire) && "hidden" // Hide when sidebar is visible or questionnaire is selected
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        <div
          className={cn(
            "h-full",
            "transition-transform duration-200 ease-in-out",
            isSidebarCollapsed ? "-translate-x-full" : "translate-x-0",
            "md:translate-x-0" // Always visible on desktop
          )}
        >
          <QuestionnaireSidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onSearch={() => {}}
          />
        </div>
      </div>

      {/* Main content area */}
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          // Height and margin for header
          "h-[calc(100vh-64px)] 2xl:h-[calc(100vh-80px)] 3xl:h-[calc(100vh-96px)]",
          "mt-[64px] 2xl:mt-[80px] 3xl:mt-[96px]",
          "flex-1 overflow-hidden",
          // Sidebar margin states - only on desktop
          "ml-0",
          // Collapsed state
          isSidebarCollapsed && "md:ml-20",
          // Normal state (when not collapsed)
          !isSidebarCollapsed && "md:ml-64",
          // Wide state (when not collapsed)
          !isSidebarCollapsed && "2xl:ml-[350px]"
        )}
        autoSaveId="questionnaire-layout"
      >
        {/* On mobile: Hide list when questionnaire selected */}
        <ResizablePanel
          id="questionnaire-list"
          order={1}
          defaultSize={30}
          minSize={MIN_PANEL_SIZE}
          className={cn(
            "flex flex-col gap-4 p-4 pt-6",
            selectedQuestionnaire && "hidden md:flex"
          )}
        >
          <QuestionnaireList
            questionnaires={filteredQuestionnaires}
            selectedQuestionnaire={selectedQuestionnaire}
            onQuestionnaireSelect={handleQuestionnaireSelect}
            isPanelOpen={!!selectedQuestionnaire}
          />
        </ResizablePanel>

        {/* On mobile: Show full screen with back button */}
        {selectedQuestionnaire && (
          <>
            <ResizableHandle className="hidden md:flex" withHandle />
            <ResizablePanel
              id="dynamic-panel"
              order={2}
              defaultSize={
                panelState === "form" || panelState === "qrCode" ? 70 : 50
              }
              minSize={MIN_PANEL_SIZE}
              className={cn(
                "flex flex-col",
                "fixed inset-0 md:relative md:inset-auto", // Full screen on mobile
                "z-30 md:z-auto"
              )}
            >
              <div className="md:hidden p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedQuestionnaire(null);
                    setPanelState("empty");
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to List
                </Button>
              </div>
              <QuestionnaireDynamicPanel
                questionnaire={selectedQuestionnaire}
                state={panelState}
                onStateChange={setPanelState}
                isQrEntry={isQrEntry}
                onBack={handleBack}
                onActionSelect={handleActionSelect}
              />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <QuestionnaireWarningDialog
        open={showWarningDialog}
        onOpenChange={setShowWarningDialog}
        onConfirm={handleWarningConfirm}
      />
    </div>
  );
}
