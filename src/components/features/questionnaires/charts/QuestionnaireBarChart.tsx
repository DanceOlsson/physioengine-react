import { useTheme } from "@/hooks/useTheme";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { SectionScore } from "@/lib/types/questionnaire.types";
import { useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js";

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

  // Cleanup chart on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const chartData: ChartData = {
    labels: sections.map((section) => section.name),
    datasets: [
      {
        label: "Score",
        data: sections.map((section) => section.score),
        backgroundColor:
          theme === "dark"
            ? "hsl(142, 76%, 76%)" // Light green in dark mode
            : "hsl(142, 76%, 36%)", // Dark green in light mode
        borderColor:
          theme === "dark" ? "hsl(142, 76%, 76%)" : "hsl(142, 76%, 36%)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Score",
          color:
            theme === "dark" ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
          font: {
            size: 14,
          },
        },
        ticks: {
          color:
            theme === "dark"
              ? "hsl(215, 20.2%, 65.1%)"
              : "hsl(215.4, 16.3%, 46.9%)",
          font: {
            size: 12,
          },
        },
        grid: {
          color:
            theme === "dark"
              ? "hsl(217.2, 32.6%, 17.5%)"
              : "hsl(214.3, 31.8%, 91.4%)",
        },
      },
      x: {
        ticks: {
          color:
            theme === "dark"
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
        backgroundColor:
          theme === "dark" ? "hsl(222.2, 84%, 4.9%)" : "hsl(0, 0%, 100%)",
        titleColor:
          theme === "dark" ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
        bodyColor:
          theme === "dark" ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
        borderColor:
          theme === "dark"
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
