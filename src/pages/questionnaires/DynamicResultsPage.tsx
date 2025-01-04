import { useParams } from "react-router-dom";
import { DynamicResultsReader } from "@/components/dynamic-readers/DynamicResultsReader";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import { calculateDashScores } from "@/lib/calculators/dash";
import { calculateEq5dScore } from "@/lib/calculators/eq5d";
import { calculateHoosScores } from "@/lib/calculators/hoos";
import { calculateKoosScores } from "@/lib/calculators/koos";
import { calculateSefasScore } from "@/lib/calculators/sefas";
import { calculateSatisfactionScore } from "@/lib/calculators/satisfaction";

// Map questionnaire IDs to their calculator functions
const QUESTIONNAIRE_CALCULATORS: Record<string, (responses: any) => any> = {
  HOOS: calculateHoosScores,
  KOOS: calculateKoosScores,
  DASH: calculateDashScores,
  SEFAS: calculateSefasScore,
  "EQ-5D-5L": calculateEq5dScore,
  SATISFACTION: calculateSatisfactionScore,
};

export function DynamicResultsPage() {
  const { questionnaireId = "" } = useParams();
  const storageKey = `${questionnaireId.toLowerCase()}Responses`;
  const { responses } = useQuestionnaireResponses(storageKey);

  // Get the calculator function for this questionnaire
  const calculator = QUESTIONNAIRE_CALCULATORS[questionnaireId.toUpperCase()];

  if (!calculator || !responses) {
    return (
      <div className="p-6">
        <p>No results found for this questionnaire.</p>
      </div>
    );
  }

  const result = calculator(responses);

  return (
    <div className="container mx-auto py-6">
      <DynamicResultsReader
        questionnaireId={questionnaireId.toUpperCase()}
        result={result}
      />
    </div>
  );
}
