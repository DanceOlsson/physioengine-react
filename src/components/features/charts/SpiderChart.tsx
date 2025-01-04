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

  // Extract section scores
  const labels = result.sections.map((section) => section.name);
  const scores = result.sections.map((section) => section.score);

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
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
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
