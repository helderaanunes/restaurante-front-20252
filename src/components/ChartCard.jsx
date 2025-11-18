import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

// Registrar módulos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ChartCard = ({ title, data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: title,
        data: data.map(item => item.value),
        borderWidth: 2,
        fill: false,
      }
    ]
  };

  return (
    <div style={{ marginBottom: "35px" }}>
      <h5 style={{ marginBottom: "15px" }}>{title}</h5>
      <Line data={chartData} />
    </div>
  );
};

export default ChartCard;
