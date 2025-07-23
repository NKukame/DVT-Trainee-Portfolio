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

const PolarChart = (props) => {
  const data = {
    labels: props.user.softSkilled.map(skill => `${skill.softSkill.name}`) ,
    datasets: [
      {
        label: 'My Polar Dataset',
        data: props.user.softSkilled.map(rate => `${rate.skillsRating}`) ,
        backgroundColor: [
          'rgba(0, 122, 255, 1)',    // Bright Blue (good in both modes)
          'rgba(255, 99, 132, 1)',   // Soft Red for contrast
          'rgba(147, 178, 199, 1)',   // Light Sky Blue
          'rgba(75, 192, 192, 1)',   // Teal / Aqua
          'rgba(255, 205, 86, 1)',   // Yellow for brightness in dark mode
          'rgba(153, 102, 255, 1)',  // Purple (adds variation but still soft)
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
