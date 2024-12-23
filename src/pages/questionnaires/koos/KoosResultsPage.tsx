// Note: Layout concerns are handled by parent App.tsx:
// - container width
// - horizontal padding
// - flex layout
// - main tag wrapper
// Only page-specific spacing (py-24) is handled here

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Card } from "@/components/ui";
import {
  QuestionnaireResult,
  SectionScore,
} from "@/lib/types/questionnaire.types";
import { calculateKoosScores } from "@/lib/calculators/koos";
import { useQuestionnaireResponses } from "@/hooks/useQuestionnaireResponses";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function KoosResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuestionnaireResult | null>(null);
  const { responses, error } = useQuestionnaireResponses("koosResponses");
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  // Cleanup chart on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/questionnaires/koos");
      return;
    }

    if (responses) {
      try {
        const calculatedResults = calculateKoosScores(responses);
        setResults(calculatedResults);
      } catch (err) {
        console.error("Error calculating results:", err);
        navigate("/questionnaires/koos");
      }
    }
  }, [responses, error, navigate]);

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
    maintainAspectRatio: false,
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
          <Bar ref={chartRef as any} data={chartData} options={chartOptions} />
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
    </div>
  );
}
