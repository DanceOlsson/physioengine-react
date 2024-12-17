import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import koosQuestionnaire from "@/data/questionnaires/koos_swedish";

export function KoosQuestionnairePage() {
  return (
    <QuestionnaireForm
      questionnaire={koosQuestionnaire[0]}
      storageKey="koosResponses"
      resultsPath="results"
    />
  );
}
