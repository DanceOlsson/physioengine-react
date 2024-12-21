// Note: Layout concerns are handled by parent App.tsx:
// - container width
// - horizontal padding
// - flex layout
// - main tag wrapper
// Only page-specific spacing (py-24) is handled here

import { DynamicQuestionnaireForm } from "@/components/dynamic-readers/DynamicQuestionnaireForm";
import { questions } from "@/assets/questionnaires/hoos_swedish";
import { useNavigate } from "react-router-dom";

export function HoosQuestionnairePage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("results");
  };

  return (
    <div className="py-24">
      <DynamicQuestionnaireForm
        questionnaire={questions[0]}
        storageKey="hoosResponses"
        resultsPath="results"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
