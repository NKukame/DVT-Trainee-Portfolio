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

const CVHorizontalBarChart = (props) => {
  const data = {
    labels: props.user.techStack.map(skill => `${skill.techStack.name}`),
    datasets: [
      {
        label: 'Rating',
        data: props.user.techStack.map(rate => `${rate.Techrating}`),
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
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CVHorizontalBarChart;
