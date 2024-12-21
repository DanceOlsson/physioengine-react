import { DynamicQuestionnaireForm } from "@/components/dynamic-readers/DynamicQuestionnaireForm";
import { questions } from "@/assets/questionnaires/satisfaction_swedish";
import { useNavigate } from "react-router-dom";

export function SatisfactionQuestionnairePage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("results");
  };

  return (
    <div className="py-24">
      <DynamicQuestionnaireForm
        questionnaire={questions[0]}
        storageKey="satisfactionResponses"
        resultsPath="results"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
