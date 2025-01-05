import { Card } from "@/components/ui/card";
import {
  QuestionnaireResult,
  VisualizationConfig,
  Questionnaire,
} from "@/lib/types/questionnaire.types";
import { SpiderChart } from "@/components/features/charts/SpiderChart";
import { SimpleScoreDisplay } from "@/components/features/charts/SimpleScoreDisplay";

// Map questionnaire types to their visualization configs
const QUESTIONNAIRE_VISUALIZATIONS: Record<string, VisualizationConfig> = {
  HOOS: {
    type: "spider",
    options: { showTotal: true, showSections: true },
  },
  KOOS: {
    type: "spider",
    options: { showTotal: true, showSections: true },
  },
  DASH: {
    type: "spider",
    options: { showTotal: true, showSections: true },
  },
  SEFAS: {
    type: "simple",
    options: { showTotal: true },
  },
  "EQ-5D-5L": {
    type: "spider",
    options: { showTotal: false, showSections: true },
  },
};

interface DynamicResultsReaderProps {
  questionnaireId: string;
  result: QuestionnaireResult;
  questionnaire: Questionnaire;
}

export function DynamicResultsReader({
  questionnaireId,
  result,
  questionnaire,
}: DynamicResultsReaderProps) {
  const config = QUESTIONNAIRE_VISUALIZATIONS[questionnaireId] || {
    type: "simple",
  };

  // For EQ-5D-5L, separate VAS score and add interpretations
  const isEQ5D = questionnaireId === "EQ-5D-5L";
  const vasScore = isEQ5D
    ? {
        ...result,
        sections: result.sections
          .filter((s) => s.name === "vas")
          .map((s) => {
            const vasSection = questionnaire.sections.find(
              (qs) => qs.questions[0].id === "vas"
            );
            return {
              ...s,
              name: vasSection?.title || s.name,
              interpretation: `${s.score}/100`,
            };
          }),
      }
    : undefined;

  // Get interpretation for a score
  const getInterpretation = (score: number) => {
    if (!questionnaire.interpretations?.ranges) return "";

    // For EQ-5D-5L, direct level mapping
    if (isEQ5D) {
      return questionnaire.interpretations.ranges[score.toString()] || "";
    }

    // For other questionnaires, check ranges (e.g., "0-25")
    for (const range of Object.keys(questionnaire.interpretations.ranges)) {
      const [min, max] = range.split("-").map(Number);
      if (score >= min && score <= max) {
        return questionnaire.interpretations.ranges[range];
      }
    }
    return "";
  };

  const dimensionScores = isEQ5D
    ? {
        ...result,
        sections: result.sections
          .filter((s) => s.name !== "vas")
          .map((s) => {
            // Find the corresponding section in questionnaire data
            const section = questionnaire.sections.find(
              (qs) => qs.questions[0].id === s.name
            );
            return {
              ...s,
              name: section?.title || s.name,
              interpretation: getInterpretation(s.score),
            };
          }),
        interpretation: questionnaire.interpretations?.labels?.healthState
          ? `${questionnaire.interpretations.labels.healthState}: ${result.interpretation}`
          : result.interpretation,
      }
    : {
        ...result,
        sections: result.sections.map((s) => ({
          ...s,
          interpretation: getInterpretation(s.score),
        })),
      };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {result.questionnaire_name} Results
        </h2>
        {config.type === "spider" && (
          <SpiderChart
            result={dimensionScores}
            showTotal={config.options?.showTotal}
          />
        )}
        {config.type === "simple" && (
          <SimpleScoreDisplay
            result={result}
            showTotal={config.options?.showTotal}
          />
        )}
        {/* Show VAS score separately for EQ-5D-5L */}
        {vasScore && <SimpleScoreDisplay result={vasScore} showTotal={false} />}
      </div>
    </Card>
  );
}
