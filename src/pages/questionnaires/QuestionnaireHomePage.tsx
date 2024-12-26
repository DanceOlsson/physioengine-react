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
    if (isMobile) {
      setSelectedQuestionnaire(null);
      setPanelState("empty");
    }
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
      <QuestionnaireSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onSearch={() => {}}
      />
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          "h-[calc(100vh-64px)] 2xl:h-[calc(100vh-80px)] 3xl:h-[calc(100vh-96px)]",
          "mt-[64px] 2xl:mt-[80px] 3xl:mt-[96px]",
          "flex-1 overflow-hidden"
        )}
        autoSaveId="questionnaire-layout"
      >
        <ResizablePanel
          id="questionnaire-list"
          order={1}
          defaultSize={30}
          minSize={MIN_PANEL_SIZE}
          className={cn(
            "flex flex-col gap-4 p-4 pt-6",
            isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
          )}
        >
          <QuestionnaireList
            questionnaires={questionnaires}
            selectedQuestionnaire={selectedQuestionnaire}
            onQuestionnaireSelect={handleQuestionnaireSelect}
            isPanelOpen={!!selectedQuestionnaire}
          />
        </ResizablePanel>

        {selectedQuestionnaire && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel
              id="dynamic-panel"
              order={2}
              defaultSize={
                panelState === "form" || panelState === "qrCode" ? 70 : 50
              }
              minSize={MIN_PANEL_SIZE}
              className="flex flex-col"
            >
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
