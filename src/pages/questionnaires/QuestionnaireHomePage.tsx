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
import { QuestionnaireActionDialog } from "@/components/features/questionnaires/QuestionnaireActionDialog";
import { useBeforeUnload } from "@/hooks/use-before-unload.ts";

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
    category: "arm",
  },
  {
    id: "satisfaction",
    title: "Patient Satisfaction",
    description: "Brief survey about your healthcare experience",
    category: "general",
  },
];

export function QuestionnaireHomePage() {
  // Responsive state
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Questionnaire state
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire | null>(null);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [panelState, setPanelState] = useState<PanelState>("empty");
  const [showDynamicPanel, setShowDynamicPanel] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);

  // Filter questionnaires
  const filteredQuestionnaires = questionnaires.filter((q) => {
    const matchesCategory =
      !selectedCategory || q.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle mobile responsiveness
  useEffect(() => {
    setIsSidebarCollapsed(isMobile);
  }, [isMobile]);

  // Handle navigation protection
  const shouldPreventNavigation =
    panelState === "form" ||
    panelState === "qrCode" ||
    panelState === "liveResults";

  useBeforeUnload(
    shouldPreventNavigation,
    "You have an active questionnaire session. Are you sure you want to leave?"
  );

  // Handle questionnaire selection
  const handleQuestionnaireSelect = (
    questionnaire: Questionnaire,
    position: { top: number; right: number }
  ) => {
    if (shouldPreventNavigation) {
      const confirmed = window.confirm(
        "You have an active questionnaire session. Are you sure you want to switch questionnaires?"
      );
      if (!confirmed) return;
    }
    setSelectedQuestionnaire(questionnaire);
    setButtonPosition(position);
    setShowActionDialog(true);
    setShowDynamicPanel(false);
    setPanelState("empty");
  };

  // Handle action selection
  const handleActionSelect = (action: "qrCode" | "form") => {
    setShowActionDialog(false);
    setShowDynamicPanel(true);
    setPanelState(action === "qrCode" ? "qrCode" : "form");
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      {!isMobile && (
        <QuestionnaireSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onSearch={setSearchQuery}
        />
      )}

      {/* Main content */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* List panel */}
        <div className="w-full">
          <QuestionnaireList
            questionnaires={filteredQuestionnaires}
            selectedQuestionnaire={selectedQuestionnaire}
            onQuestionnaireSelect={handleQuestionnaireSelect}
          />
        </div>

        {/* Dynamic panel - only show after action selection */}
        {showDynamicPanel && (
          <div className="absolute inset-y-0 right-0 w-[60%] transform transition-transform duration-300 ease-in-out">
            <QuestionnaireDynamicPanel
              questionnaire={selectedQuestionnaire}
              state={panelState}
              onStateChange={setPanelState}
            />
          </div>
        )}

        {/* Action Dialog */}
        <QuestionnaireActionDialog
          open={showActionDialog}
          onOpenChange={setShowActionDialog}
          questionnaireName={selectedQuestionnaire?.title ?? ""}
          onActionSelect={handleActionSelect}
          buttonPosition={buttonPosition}
        />
      </div>
    </div>
  );
}
