import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function UsersByDivision() {
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    const responsesRef = ref(database, "responses");

    onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos obtenidos de Firebase:", data);
      if (data) {
        const divisionCounts = {};

        // Contar usuarios por división
        Object.values(data).forEach((user) => {
          const division = user.division;
          if (division) {
            divisionCounts[division] = (divisionCounts[division] || 0) + 1;
          } else {
            console.log("Usuario sin división:", user); // Para verificar si hay usuarios sin división
          }
        });

        // Obtener el total de usuarios
        const totalUsers = Object.values(divisionCounts).reduce((sum, count) => sum + count, 0);

        // Convertir a un array y calcular porcentajes
        const divisionArray = Object.entries(divisionCounts).map(([name, count]) => ({
          name,
          count,
          percentage: ((count / totalUsers) * 100).toFixed(2) + "%",
        }));

        setDivisions(divisionArray);
      }
    });
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
              <th className="py-3 ps-4">División</th>
              <th className="text-center">Cantidad</th>
              <th className="text-center">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {divisions.map((div, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                <td className="ps-4 fw-bold text-primary">{div.name}</td>
                <td className="text-center">{div.count}</td>
                <td className="text-center">
                  <span className="badge bg-info rounded-pill px-3 py-2">
                    {div.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="card-footer bg-light">
      <p className="text-center text-dark fw-bold mb-0">
        Usuarios Totales: 
        <span className="text-success ms-2 fs-5">
          {divisions.reduce((sum, div) => sum + div.count, 0)}
        </span>
      </p>
    </div>
  </div>
</div>
  );

}


