import { fetchDataFromRepository } from "@/graphdb/repositorie";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent = () => {
  const [data, setData] = useState<RepositorieData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchDataFromRepository();
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  const chartData = {
    datasets: [
      {
        label: "Sites UNESCO",
        data: data.map((item) => ({
          x: item.idh,
          y:
            item.etat === "Bien conservé" ? 3 : item.etat === "Délabré" ? 2 : 1,
          label: item.site,
        })),
        backgroundColor: data.map((item) =>
          item.etat === "Bien conservé"
            ? "green"
            : item.etat === "Délabré"
            ? "orange"
            : "red"
        ),
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "État des sites UNESCO en fonction de l'IDH",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.raw.label} (${context.raw.x}, ${
              context.raw.y === 3
                ? "Bien conservé"
                : context.raw.y === 2
                ? "Délabré"
                : "En danger"
            })`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "IDH",
        },
      },
      y: {
        title: {
          display: true,
          text: "État du site",
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          max: 3,
          callback: function (tickValue: string | number) {
            const value = Number(tickValue);
            return value === 3
              ? "Bien conservé"
              : value === 2
              ? "Délabré"
              : "En danger";
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Graphique des sites UNESCO</h1>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default GraphComponent;
