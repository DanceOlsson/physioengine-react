import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  QuestionnaireResult,
  SectionScore,
} from "@/lib/types/questionnaire.types";
import { calculateSefasScore } from "@/lib/calculators/sefas";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import { QuestionnaireBarChart } from "@/components/features/charts/QuestionnaireBarChart";

export function SefasResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuestionnaireResult | null>(null);
  const { responses, error } = useQuestionnaireResponses("sefasResponses");

  useEffect(() => {
    if (error) {
      navigate("/questionnaires/sefas");
      return;
    }

    if (responses) {
      try {
        const calculatedResults = calculateSefasScore(responses);
        setResults(calculatedResults);
      } catch (err) {
        console.error("Error calculating results:", err);
        navigate("/questionnaires/sefas");
      }
    }
  }, [responses, error, navigate]);

  if (!results || !responses) {
    return <div className="text-foreground">Loading results...</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Overall Score
        </h2>
        <div className="text-4xl font-bold text-primary mb-2">
          {Math.round(results.total_score)}
        </div>
        <div className="text-lg text-muted-foreground">
          Interpretation: {results.interpretation}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          Section Scores
        </h2>
        <div className="h-[400px] bg-card">
          <QuestionnaireBarChart sections={results.sections} />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Detailed Results
        </h2>
        <div className="space-y-4">
          {results.sections.map((section: SectionScore, index: number) => (
            <div
              key={index}
              className="border-b border-border last:border-0 pb-4"
            >
              <h3 className="font-medium text-lg text-foreground">
                {section.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <div className="text-muted-foreground">
                  Score: {Math.round(section.score)}/48
                </div>
                <div className="text-muted-foreground">
                  Interpretation: {section.interpretation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}