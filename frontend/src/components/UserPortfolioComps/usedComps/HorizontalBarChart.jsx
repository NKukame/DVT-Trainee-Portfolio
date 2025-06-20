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

const HorizontalBarChart = () => {
  const data = {
    labels: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
    datasets: [
      {
        label: 'Usage (%)',
        data: [60, 30, 20, 10, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
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
      },
      title: {
        display: true,
        text: 'JavaScript Framework Popularity',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
