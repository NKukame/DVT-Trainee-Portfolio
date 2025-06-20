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
    labels: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Node.js'],
    datasets: [
      {
        label: 'Usage (%)',
        data: [60, 30, 20, 10, 40, 50],
        backgroundColor: [
            'rgba(7, 37, 73, 1)',
            'rgba(8, 70, 119, 1)',
            'rgba(17, 97, 158, 1)',
            'rgba(2, 127, 185, 1)',
            'rgba(97, 164, 207, 1)',
            'rgba(0, 32, 56, 1)',
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
    //   title: {
    //     display: true,
    //     text: 'JavaScript Framework Popularity',
    //   },
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
