import { Box, Typography } from "@mui/material";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = Array.from({ length: 30 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

const generateRandomData = () =>
  Array.from({ length: 30 }, () => Math.floor(Math.random() * 50 + 20));

const data = {
  labels,
  datasets: [
    {
      label: "Available",
      data: generateRandomData(),
      backgroundColor: "rgba(147, 144, 238, 0.5)",
      stack: "stack",
      borderRadius: 5,
      barPercentage: 0.8,
      categoryPercentage: 0.9,
    },
    {
      label: "Occupied",
      data: generateRandomData(),
      backgroundColor: "rgba(41, 34, 139, 0.8)",
      stack: "stack",
      borderRadius: 5,
      barPercentage: 0.8,
      categoryPercentage: 0.9,
    },
    {
      label: "Not Ready",
      data: generateRandomData().map((val) => -val),
      backgroundColor: "rgba(211, 211, 211, 0.5)",
      stack: "stack",
      borderRadius: 5,
      barPercentage: 0.8,
      categoryPercentage: 0.9,
    },
  ],
};

const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value: number | string) {
          return Math.abs(Number(value));
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

export const Chart = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" mb={2} gap={2}>
        <Box display="flex" gap={1} alignItems="center">
          <Box width={25} height={10} bgcolor="rgba(147, 144, 238, 0.5)" />
          <Typography variant="caption">Available</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Box width={25} height={10} bgcolor="rgba(41, 34, 139, 0.8)" />
          <Typography variant="caption">Occupied</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Box width={25} height={10} bgcolor="rgba(211, 211, 211, 0.5)" />
          <Typography variant="caption">Not Ready</Typography>
        </Box>
      </Box>
      <Bar options={options} data={data} />
    </Box>
  );
};
