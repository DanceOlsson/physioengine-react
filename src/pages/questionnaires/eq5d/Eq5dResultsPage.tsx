import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calculateEq5dScore } from "@/lib/calculators/eq5d";
import { QuestionnaireResult } from "@/lib/types/questionnaire.types";
import { Copy } from "lucide-react";

export function Eq5dResultsPage() {
  const [result, setResult] = useState<QuestionnaireResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const responses = localStorage.getItem("eq5dResponses");
    if (responses) {
      const result = calculateEq5dScore(JSON.parse(responses));
      setResult(result);
    }
  }, []);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.interpretation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">No responses found.</p>
      </div>
    );
  }

  // Find the health state and VAS score sections
  const healthStateSection = result.sections.find(
    (s) => s.name === "Health State"
  );
  const vasScoreSection = result.sections.find((s) => s.name === "VAS Score");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">EQ-5D-5L Results</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy Summary"}
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Health State Profile</h2>
        <div className="space-y-2 font-mono text-sm">
          {healthStateSection?.interpretation.split("\n").map((line, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {line.split(": ")[0]}:
              </span>
              <span className="font-medium">{line.split(": ")[1]}</span>
            </div>
          ))}
        </div>
      </Card>

      {vasScoreSection && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Visual Analogue Scale (VAS)
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="text-4xl font-bold font-mono">
              {vasScoreSection.score}
            </div>
            <div className="text-sm text-muted-foreground">
              Self-rated health today
              <br />
              (0 = worst health, 100 = best health)
            </div>
          </div>
        </Card>
      )}

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-medium mb-2">Summary for Copy/Paste:</h3>
        <pre className="whitespace-pre-wrap text-sm font-mono">
          {result.interpretation}
        </pre>
      </div>
    </div>
  );
}
