import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Card, Button } from "@/components/ui";
import {
  QuestionnaireResponse,
  QuestionnaireResult,
  SectionScore,
} from "@/lib/types/questionnaire.types";
import { calculateDashScores } from "@/lib/calculators/dash";

export function DashResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuestionnaireResult | null>(null);
  const [responses, setResponses] = useState<QuestionnaireResponse | null>(
    null
  );

  useEffect(() => {
    const storedResponses = localStorage.getItem("dashResponses");
    if (!storedResponses) {
      navigate("/questionnaires/dash");
      return;
    }

    try {
      const parsedResponses = JSON.parse(
        storedResponses
      ) as QuestionnaireResponse;
      setResponses(parsedResponses);
      const calculatedResults = calculateDashScores(parsedResponses);
      setResults(calculatedResults);
    } catch (error) {
      console.error("Error parsing results:", error);
      navigate("/questionnaires/dash");
    }
  }, [navigate]);

  if (!results || !responses) {
    return <div className="text-foreground">Loading results...</div>;
  }

  const chartData = {
    labels: results.sections.map((section: SectionScore) => section.name),
    datasets: [
      {
        label: "Score",
        data: results.sections.map((section: SectionScore) => section.score),
        backgroundColor: "hsl(var(--primary) / 0.5)",
        borderColor: "hsl(var(--primary))",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Score",
          color: "hsl(var(--foreground))",
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          color: "hsl(var(--border))",
        },
      },
      x: {
        ticks: {
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          color: "hsl(var(--border))",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const isWorkSectionApplicable = responses["Q31"] === "yes";
  const isSportSectionApplicable = responses["Q37"] === "yes";

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          DASH Results
        </h1>

        <Card className="mb-8 p-6">
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

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Section Scores
          </h2>
          <div className="h-[400px] bg-card">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="mb-8 p-6">
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
                    Score: {Math.round(section.score)}/100
                  </div>
                  <div className="text-muted-foreground">
                    Interpretation: {section.interpretation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Work Section Status */}
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Work Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isWorkSectionApplicable
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isWorkSectionApplicable
                  ? "Currently Working"
                  : "Not Currently Working"}
              </span>
            </div>
            {isWorkSectionApplicable && responses["Q32"] && (
              <div className="mt-4">
                <h3 className="font-medium text-foreground">Occupation</h3>
                <p className="text-muted-foreground mt-1">{responses["Q32"]}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Sports/Music Section Status */}
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Sports/Music Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isSportSectionApplicable
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isSportSectionApplicable
                  ? "Active in Sports/Music"
                  : "Not Active in Sports/Music"}
              </span>
            </div>
            {isSportSectionApplicable && responses["Q38"] && (
              <div className="mt-4">
                <h3 className="font-medium text-foreground">Activity</h3>
                <p className="text-muted-foreground mt-1">{responses["Q38"]}</p>
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/questionnaires/dash")}
          >
            Take questionnaire again
          </Button>
          <Button variant="outline" onClick={() => navigate("/questionnaires")}>
            Back to questionnaires
          </Button>
        </div>
      </div>
    </div>
  );
}
