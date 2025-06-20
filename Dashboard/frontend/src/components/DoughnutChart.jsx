import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: window.innerWidth > 640,
        position: 'top',
        margin:15,
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[300px] md:h-[400px] p-1 ">
      <Doughnut data={data} options={options} />
    </div>
  );
};
