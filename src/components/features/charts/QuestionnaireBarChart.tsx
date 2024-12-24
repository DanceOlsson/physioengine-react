import { useTheme } from "@/components/theme-provider";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { SectionScore } from "@/lib/types/questionnaire.types";
import { useRef, useEffect } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface QuestionnaireBarChartProps {
  sections: SectionScore[];
  height?: number;
}

export function QuestionnaireBarChart({
  sections,
  height = 400,
}: QuestionnaireBarChartProps) {
  const { theme } = useTheme();
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Cleanup chart on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const chartData: ChartData<"bar"> = {
    labels: sections.map((section) => section.name),
    datasets: [
      {
        label: "Score",
        data: sections.map((section) => section.score),
        backgroundColor: isDarkMode
          ? "hsl(142, 76%, 76%)" // Light green in dark mode
          : "hsl(142, 76%, 36%)", // Dark green in light mode
        borderColor: isDarkMode ? "hsl(142, 76%, 76%)" : "hsl(142, 76%, 36%)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Score",
          color: isDarkMode ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: isDarkMode
            ? "hsl(215, 20.2%, 65.1%)"
            : "hsl(215.4, 16.3%, 46.9%)",
          font: {
            size: 12,
          },
        },
        grid: {
          color: isDarkMode
            ? "hsl(217.2, 32.6%, 17.5%)"
            : "hsl(214.3, 31.8%, 91.4%)",
        },
      },
      x: {
        ticks: {
          color: isDarkMode
            ? "hsl(215, 20.2%, 65.1%)"
            : "hsl(215.4, 16.3%, 46.9%)",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode
          ? "hsl(222.2, 84%, 4.9%)"
          : "hsl(0, 0%, 100%)",
        titleColor: isDarkMode ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
        bodyColor: isDarkMode ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
        borderColor: isDarkMode
          ? "hsl(217.2, 32.6%, 17.5%)"
          : "hsl(214.3, 31.8%, 91.4%)",
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `Score: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar ref={chartRef as any} data={chartData} options={chartOptions} />
    </div>
  );
}
