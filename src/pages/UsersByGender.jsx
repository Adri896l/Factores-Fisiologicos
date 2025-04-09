import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function UsersByGender() {
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    const responsesRef = ref(database, "responses"); 

    onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const genderCounts = {};

        // Contar usuarios por género
        Object.values(data).forEach((user) => {
          const gender = user.gender;
          if (gender) {
            genderCounts[gender] = (genderCounts[gender] || 0) + 1;
          }
        });

        // Obtener el total de usuarios
        const totalUsers = Object.values(genderCounts).reduce((sum, count) => sum + count, 0);

        // Convertir a un array y calcular porcentajes
        const genderArray = Object.entries(genderCounts).map(([gender, count]) => ({
          gender,
          count,
          percentage: ((count / totalUsers) * 100).toFixed(2) + "%",
        }));

        setGenderData(genderArray);
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
                  <th className="py-3 ps-4">Género</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                {genderData.map((genderInfo, index) => (
                  <tr key={index}>
                    <td className="ps-4 fw-bold text-primary">{genderInfo.gender}</td>
                    <td className="text-center">{genderInfo.count}</td>
                    <td className="text-center">
                    <span className="badge bg-info rounded-pill px-3 py-2">
                    {genderInfo.percentage} </span> </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card-footer bg-light">
              <p className="text-center text-dark fw-bold mb-0">
                Usuarios Totales: 
                <span className="text-success ms-2 fs-5">
                  {genderData.reduce((sum, gender) => sum + gender.count, 0)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
