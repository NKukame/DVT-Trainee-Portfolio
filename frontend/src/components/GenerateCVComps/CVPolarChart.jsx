// PolarChart.jsx
import React from 'react';
import { Line, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components you’ll use
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const CVPolarChart = (props) => {
  const data = {
    labels: props.user.softSkilled.map(skill => `${skill.softSkill.name}`) ,
    datasets: [
      {
        label: 'My Polar Dataset',
        data: props.user.softSkilled.slice(0,4).map(rate => `${rate.skillsRating}`) ,
        backgroundColor: [
          'rgb(245, 245, 220)',    // Bright Blue (good in both modes)
          'rgba(255, 99, 132, 1)',   // Soft Red for contrast
          'rgb(218, 145, 0)',   // Light Sky Blue
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
        grid:{
          color: 'rgba(255, 255, 255)',
          lineWidth: 1,
          borderDash: [5, 5]
        },
        ticks: {

          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: "start",
        labels: {
          color: 'rgba(255, 255, 255)',
          align: 'start',
          padding: 20,
          boxWidth: 38,          
          position: 'left',
          
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

export default CVPolarChart;
