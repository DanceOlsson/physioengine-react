import { useTheme } from "@/components/theme-provider";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { QuestionnaireResult } from "@/lib/types/questionnaire.types";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SpiderChartProps {
  result: QuestionnaireResult;
  showTotal?: boolean;
}

export function SpiderChart({ result, showTotal = true }: SpiderChartProps) {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Filter out VAS score for EQ-5D-5L
  const sections =
    result.questionnaire_name === "EQ-5D-5L"
      ? result.sections.filter((section) => section.name !== "VAS")
      : result.sections;

  // Extract section scores
  const labels = sections.map((section) => section.name);
  const scores = sections.map((section) => section.score);

  // Calculate min and max values from the scores
  const validScores = scores.filter((score) => score >= 0);
  const minScore = Math.min(...validScores);
  const maxScore = Math.max(...validScores);

  // For EQ-5D-5L, force scale from 1 to 5
  const isEQ5D = result.questionnaire_name === "EQ-5D-5L";
  const finalMinScore = isEQ5D ? 1 : minScore;
  const finalMaxScore = isEQ5D ? 5 : maxScore;
  const stepSize = isEQ5D ? 1 : Math.ceil((finalMaxScore - finalMinScore) / 5);

  const data = {
    labels,
    datasets: [
      {
        label: result.questionnaire_name,
        data: scores,
        fill: true,
        backgroundColor: isDark
          ? "rgba(124, 58, 237, 0.2)"
          : "rgba(124, 58, 237, 0.2)",
        borderColor: isDark ? "rgba(124, 58, 237, 1)" : "rgba(124, 58, 237, 1)",
        pointBackgroundColor: isDark
          ? "rgba(124, 58, 237, 1)"
          : "rgba(124, 58, 237, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: isDark
          ? "rgba(124, 58, 237, 1)"
          : "rgba(124, 58, 237, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: finalMinScore,
        max: finalMaxScore,
        ticks: {
          stepSize,
          color: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
        },
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        angleLines: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        pointLabels: {
          color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const score = context.raw;
            return `Score: ${score}`;
          },
        },
      },
    },
    maintainAspectRatio: true,
    aspectRatio: 1,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Radar data={data} options={options} />
      {showTotal && result.total_score >= 0 && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            Total Score: {result.total_score}
          </p>
        </div>
      )}
    </div>
  );
}
