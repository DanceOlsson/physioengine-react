import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { calculateKoosScores } from "@/lib/calculators/koos";
import { KoosResult, KoosResponse } from "@/lib/types/koos";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  const [results, setResults] = useState<KoosResult | null>(null);

  useEffect(() => {
    const storedResponses = localStorage.getItem("koosResponses");
    if (!storedResponses) {
      navigate("/questionnaires/koos");
      return;
    }

    try {
      const responses = JSON.parse(storedResponses) as KoosResponse;
      const calculatedResults = calculateKoosScores(responses);
      setResults(calculatedResults);
    } catch (error) {
      console.error("Error calculating results:", error);
      navigate("/questionnaires/koos");
    }
  }, [navigate]);

  if (!results) {
    return <div>Loading results...</div>;
  }

  const chartData = {
    labels: results.sections.map((s) => s.name),
    datasets: [
      {
        label: "Score",
        data: results.sections.map((s) => s.score),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "KOOS Scores by Section",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Score (0-100)",
        },
      },
    },
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">KOOS Results</h1>

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {Math.round(results.total_score)}
          </div>
          <div className="text-lg text-gray-600">
            Interpretation: {results.interpretation}
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-6">Section Scores</h2>
          <div className="h-[400px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Detailed Results</h2>
          <div className="space-y-4">
            {results.sections.map((section, index) => (
              <div key={index} className="border-b last:border-0 pb-4">
                <h3 className="font-medium text-lg">{section.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-gray-600">
                    Score: {Math.round(section.score)}/100
                  </div>
                  <div className="text-gray-600">
                    Interpretation: {section.interpretation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/questionnaires/koos")}
          >
            Take Again
          </Button>
          <Button variant="outline" onClick={() => navigate("/questionnaires")}>
            Back to Questionnaires
          </Button>
        </div>
      </div>
    </div>
  );
}
