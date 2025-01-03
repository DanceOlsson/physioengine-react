import { DynamicQuestionnaireForm } from "@/components/dynamic-readers/DynamicQuestionnaireForm";
import { questions } from "@/assets/questionnaires/EQ-5D-5L_swedish";
import { useNavigate } from "react-router-dom";

export function Eq5dQuestionnairePage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("results");
  };

  return (
    <div className="py-24">
      <DynamicQuestionnaireForm
        questionnaire={questions[0]}
        storageKey="eq5dResponses"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
