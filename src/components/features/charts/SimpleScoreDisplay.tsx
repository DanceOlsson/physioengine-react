import { Card } from "@/components/ui/card";
import { QuestionnaireResult } from "@/lib/types/questionnaire.types";

interface SimpleScoreDisplayProps {
  result: QuestionnaireResult;
  showTotal?: boolean;
}

export function SimpleScoreDisplay({
  result,
  showTotal = true,
}: SimpleScoreDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Total Score */}
      {showTotal && result.total_score >= 0 && (
        <Card className="p-4">
          <div className="text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Total Score
            </h3>
            <p className="text-3xl font-bold">{result.total_score}</p>
            {result.interpretation && (
              <p className="text-sm text-muted-foreground mt-1">
                {result.interpretation}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Section Scores */}
      {result.sections.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {result.sections.map((section) => (
            <Card key={section.name} className="p-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {section.name}
                </h3>
                <p className="text-2xl font-bold">
                  {section.score >= 0 ? section.score : "N/A"}
                </p>
                {section.interpretation && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.interpretation}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
