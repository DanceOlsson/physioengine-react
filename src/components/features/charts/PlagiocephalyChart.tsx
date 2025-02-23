import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface PlagiocephalyChartProps {
  cvai: number | null;
  age: number;
}

export default function PlagiocephalyChart({
  cvai,
  age,
}: PlagiocephalyChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create data array for current measurement
    const currentData = Array(19).fill(null);
    if (cvai !== null && age >= 0 && age <= 18) {
      currentData[age] = cvai;
    }

    // Create new chart with exact measurements from the image
    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 19 }, (_, i) => i.toString()),
        datasets: [
          {
            label: "Expected Progression",
            data: [
              null,
              null,
              25,
              22,
              18,
              15,
              12,
              10,
              8,
              6,
              5,
              4,
              3.5,
              3,
              2.5,
              2,
              1.5,
              1,
              1,
            ],
            borderDash: [5, 5],
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0, 0, 0, 0.5)",
            fill: false,
            tension: 1,
            pointRadius: 0,
            cubicInterpolationMode: "default",
            borderWidth: 1.5,
          },
          {
            label: "Treatment Threshold",
            data: [
              20, 20, 20, 20, 20, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
              10, 10, 10,
            ],
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.7)",
            fill: false,
            tension: 0,
            pointRadius: 0,
            borderWidth: 1,
            stepped: "before",
          },
          {
            label: "Current CVAI",
            data:
              cvai !== null
                ? [
                    {
                      x: age,
                      y: cvai,
                    },
                  ]
                : [],
            xAxisID: "xHidden",
            borderColor: isDark ? "hsl(142, 76%, 76%)" : "hsl(142, 76%, 36%)",
            backgroundColor: isDark
              ? "hsl(142, 76%, 76%)"
              : "hsl(142, 76%, 36%)",
            fill: false,
            tension: 0,
            pointRadius: 8,
            pointStyle: "circle",
            borderWidth: 2,
            showLine: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          xHidden: {
            type: "linear",
            min: 0,
            max: 18,
            display: false,
            position: "top",
          },
          x: {
            title: {
              display: true,
              text: "Child's age (months)",
              color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
            },
            grid: {
              display: true,
              color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              stepSize: 1,
              color: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            },
          },
          y: {
            min: 0,
            max: 25,
            title: {
              display: true,
              text: "Plagiocephaly Index",
              color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222.2, 84%, 4.9%)",
            },
            grid: {
              display: true,
              color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              stepSize: 1,
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              color: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            },
          },
          y2: {
            min: 0,
            max: 25,
            position: "right",
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value) {
                if (value === 20) return "Severe";
                if (value === 15) return "Moderate";
                if (value === 10) return "Mild";
                return "";
              },
              color: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: "nearest",
            intersect: true,
            callbacks: {
              label: function (context) {
                if (context.dataset.label === "Current CVAI") {
                  return `CVAI: ${cvai?.toFixed(1)}%`;
                }
                return "";
              },
            },
          },
          annotation: {
            annotations: {
              // Yellow treatment zones
              treatmentZone1: {
                type: "box",
                xMin: 0,
                xMax: 5,
                yMin: 0,
                yMax: 20,
                backgroundColor: isDark
                  ? "rgba(255, 183, 77, 0.2)"
                  : "rgba(255, 183, 77, 0.3)",
                borderWidth: 0,
                drawTime: "beforeDatasetsDraw",
              },
              treatmentZone2: {
                type: "box",
                xMin: 5,
                xMax: 6,
                yMin: 0,
                yMax: 15,
                backgroundColor: isDark
                  ? "rgba(255, 183, 77, 0.2)"
                  : "rgba(255, 183, 77, 0.3)",
                borderWidth: 0,
                drawTime: "beforeDatasetsDraw",
              },
              treatmentZone3: {
                type: "box",
                xMin: 6,
                xMax: 18,
                yMin: 0,
                yMax: 10,
                backgroundColor: isDark
                  ? "rgba(255, 183, 77, 0.2)"
                  : "rgba(255, 183, 77, 0.3)",
                borderWidth: 0,
                drawTime: "beforeDatasetsDraw",
              },
              // Text annotations
              referralText: {
                type: "label",
                xValue: 8,
                yValue: 17,
                content: "Referral to neurosurgery",
                color: isDark
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(0, 0, 0, 0.7)",
                font: {
                  size: 14,
                },
              },
              treatmentText: {
                type: "label",
                xValue: 8,
                yValue: 8,
                content: "Positioning treatment and Mimos pillow",
                color: isDark
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(0, 0, 0, 0.7)",
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [theme, cvai, age]); // Add cvai and age as dependencies

  return (
    <div className="w-full h-[500px] p-4">
      <canvas ref={chartRef} />
    </div>
  );
}
