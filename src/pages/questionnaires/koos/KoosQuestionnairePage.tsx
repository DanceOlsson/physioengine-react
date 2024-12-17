import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import { questions } from "@/data/questionnaires/koos_swedish.ts";

export function KoosQuestionnairePage() {
  return (
    <QuestionnaireForm
      questionnaire={questions[0]}
      storageKey="koosResponses"
      resultsPath="results"
    />
  );
}
