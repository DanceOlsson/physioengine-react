import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import { questions } from "@/data/questionnaires/satisfaction_swedish.ts";

export function SatisfactionQuestionnairePage() {
  return (
    <QuestionnaireForm
      questionnaire={questions[0]}
      storageKey="satisfactionResponses"
      resultsPath="results"
    />
  );
}
