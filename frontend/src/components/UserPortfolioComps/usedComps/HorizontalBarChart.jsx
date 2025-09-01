import { useState, useEffect } from "react";
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

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = (props) => {
  const techStack = props.user?.techStack || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const data = {
    labels: techStack
      .slice(0, 6)
      .map((skill) => `${skill?.techStack?.name || "Unknown"}`),
    datasets: [
      {
        label: "Rating",
        data: techStack.map((rate) => `${rate?.Techrating || 0}`),
        backgroundColor: [
          "rgba(255, 99, 132, 0.85)",
          "rgba(54, 162, 235, 0.85)",
          "rgba(255, 206, 86, 0.85)",
          "rgba(75, 192, 192, 0.85)",
          "rgba(153, 102, 255, 0.85)",
          "rgba(255, 159, 64, 0.85)",
        ],
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: isMobile ? "x" : "y", // <- Makes it horizontal
    responsive: true,
    plugins: {
      legend: {
        position: isMobile ? "top" : "top",
        labels: {
          color: "rgba(102, 102, 102, 1)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "rgba(102, 102, 102, 1)",
          font: {
            size: isMobile ? 12 : 14,
            weight: "bold",
          },
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(71, 71, 71, 0.7)",
          lineWidth: 0.8,
        },
        ticks: {
          color: "rgba(102, 102, 102, 1)",
          font: {
            size: isMobile ? 12 : 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "fit-content" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
