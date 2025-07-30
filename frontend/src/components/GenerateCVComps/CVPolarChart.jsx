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
        data: props.user.softSkilled.map(rate => `${rate.skillsRating}`) ,
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
