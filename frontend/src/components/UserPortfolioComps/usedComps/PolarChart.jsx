// PolarChart.jsx
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components you’ll use
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
  const data = {
    labels: ['Teamwork', 'Problem Solving', 'Emotional Intelligence', 'Communication', 'Humor', 'Conflict Resolution'],
    datasets: [
      {
        label: 'My Polar Dataset',
        data: [5, 2, 3, 5, 4, 3],
        backgroundColor: [
          'rgba(0, 32, 56, 1)',
          'rgba(7, 37, 73, 1)',
          'rgba(8, 70, 119, 1)',
          'rgba(17, 97, 158, 1)',
          'rgba(2, 127, 185, 1)',
          'rgba(97, 164, 207, 1)',
        ],
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

export default PolarChart;
