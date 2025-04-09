import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function UsersBySentiment() {
  const [sentimentData, setSentimentData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const responsesRef = ref(database, "responses");

    onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos recibidos de Firebase:", data);
    
      if (!data) {
        console.log("No hay datos en Firebase");
        return;
      }
    
      const sentimentCounts = { Positivo: 0, Negativo: 0, Neutro: 0 };
    
      Object.values(data).forEach((user) => {
        if (!user.responses || typeof user.responses !== "object") return;
    
        console.log("Procesando respuestas:", user.responses);
    
        // Convertimos el objeto `responses` en un array de valores
        const responsesArray = Object.values(user.responses);
    
        const positive = responsesArray.filter((r) => r === "Positivo").length;
        const negative = responsesArray.filter((r) => r === "Negativo").length;
        const neutral = responsesArray.filter((r) => r === "Neutro").length;
    
        if (positive >= 6) sentimentCounts.Positivo++;
        else if (negative >= 6) sentimentCounts.Negativo++;
        else sentimentCounts.Neutro++;
      });
    
      const totalUsers = sentimentCounts.Positivo + sentimentCounts.Negativo + sentimentCounts.Neutro;
      console.log("Total de usuarios:", totalUsers);
    
      const sentimentArray = Object.entries(sentimentCounts).map(([sentiment, count]) => ({
        sentiment,
        count,
        percentage: totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(2) + "%" : "0%",
      }));
    
      setSentimentData(sentimentArray);
    
      if (totalUsers > 0) {
        setChartData({
          labels: ['Positivo', 'Negativo', 'Neutro'],
          datasets: [
            {
              label: 'Usuarios por Sentimiento',
              data: [
                sentimentCounts.Positivo,
                sentimentCounts.Negativo,
                sentimentCounts.Neutro,
              ],
              backgroundColor: ['#28a745', '#dc3545', '#6c757d'],
              borderColor: ['#218838', '#c82333', '#5a6268'],
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.log("No hay suficientes datos para generar el gráfico.");
      }
    });    
    
    return () => {
      off(responsesRef); // Detener la escucha cuando el componente se desmonta
    };
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-gradient-primary text-white">
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-3 ps-4">Sentimiento</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                {sentimentData.map((s, index) => (
                  <tr key={index}>
                    <td>{s.sentiment}</td>
                    <td>{s.count}</td>
                    <td>{s.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Gráfico de barras */}
          <div className="mt-4">
            {chartData.datasets.length > 0 ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Distribución de Sentimientos",
                    },
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            ) : (
              <p className="text-center mt-3">No hay datos suficientes para generar el gráfico</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
