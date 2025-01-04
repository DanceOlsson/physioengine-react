import { Card } from "@/components/ui/card";
import {
  QuestionnaireResult,
  VisualizationConfig,
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
    options: { showSections: true },
  },
};

interface DynamicResultsReaderProps {
  questionnaireId: string;
  result: QuestionnaireResult;
}

export function DynamicResultsReader({
  questionnaireId,
  result,
}: DynamicResultsReaderProps) {
  const config = QUESTIONNAIRE_VISUALIZATIONS[questionnaireId] || {
    type: "simple",
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {result.questionnaire_name} Results
        </h2>
        {config.type === "spider" && (
          <SpiderChart result={result} showTotal={config.options?.showTotal} />
        )}
        {config.type === "simple" && (
          <SimpleScoreDisplay
            result={result}
            showTotal={config.options?.showTotal}
          />
        )}
      </div>
    </Card>
  );
}
