import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = (props) => {
  const data = {
    labels: props.user.techStack.slice(0, 6).map(skill => `${skill.techStack.name}`),
    datasets: [
      {
        label: 'Rating',
        data: props.user.techStack.map(rate => `${rate.Techrating}`),
        backgroundColor: [
            'rgba(255, 99, 132, 0.85)',
            'rgba(54, 162, 235, 0.85)',
            'rgba(255, 206, 86, 0.85)',
            'rgba(75, 192, 192, 0.85)',
            'rgba(153, 102, 255, 0.85)',
            'rgba(255, 159, 64, 0.85)',
        ],
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // <- Makes it horizontal
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(102, 102, 102, 1)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      y:{
        ticks: {
          color: 'rgba(102, 102, 102, 1)',
          font: {
            size: 14,
            weight: 'bold',
          }
      }},
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(71, 71, 71, 0.7)',
          lineWidth: 0.8,
        },
        ticks: {
          color: 'rgba(102, 102, 102, 1)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
