import { QuestionnaireForm } from "@/components/questionnaires/QuestionnaireForm";
import satisfactionQuestionnaire from "@/data/questionnaires/satisfaction_swedish";

export function SatisfactionQuestionnairePage() {
  return (
    <QuestionnaireForm
      questionnaire={satisfactionQuestionnaire[0]}
      storageKey="satisfactionResponses"
      resultsPath="results"
    />
  );
}
