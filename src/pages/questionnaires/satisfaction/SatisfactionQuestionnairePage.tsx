import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import { questions } from "@/assets/questionnaires/satisfaction_swedish";

export function SatisfactionQuestionnairePage() {
  return (
    <QuestionnaireForm
      questionnaire={questions[0]}
      storageKey="satisfactionResponses"
      resultsPath="results"
    />
  );
}
