import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import { questions } from "@/assets/questionnaires/koos_swedish";

export function KoosQuestionnairePage() {
  return (
    <QuestionnaireForm
      questionnaire={questions[0]}
      storageKey="koosResponses"
      resultsPath="results"
    />
  );
}
