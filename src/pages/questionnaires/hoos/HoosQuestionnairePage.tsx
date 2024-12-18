// Note: Layout concerns are handled by parent App.tsx:
// - container width
// - horizontal padding
// - flex layout
// - main tag wrapper
// Only page-specific spacing (py-24) is handled here

import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import { questions } from "@/assets/questionnaires/hoos_swedish";

export function HoosQuestionnairePage() {
  return (
    <div className="py-24">
      <QuestionnaireForm
        questionnaire={questions[0]}
        storageKey="hoosResponses"
        resultsPath="results"
      />
    </div>
  );
}
