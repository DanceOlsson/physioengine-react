import { DynamicQuestionnaireForm } from "@/components/dynamic-readers/DynamicQuestionnaireForm";
import { questions } from "@/assets/questionnaires/sefas_swedish";
import { useNavigate } from "react-router-dom";

export function SefasQuestionnairePage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("results");
  };

  return (
    <div className="py-24">
      <DynamicQuestionnaireForm
        questionnaire={questions[0]}
        storageKey="sefasResponses"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
