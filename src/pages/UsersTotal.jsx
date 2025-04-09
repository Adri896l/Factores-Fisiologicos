import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function UsersTotal() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const responsesRef = ref(database, "responses");

    onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convertir los datos en un array para mostrar en la tabla
        const usersArray = Object.values(data).map((user) => ({
          name: user.name,
          age: user.age,
          division: user.division,
          gender: user.gender,
          totalScore: user.totalScore,
        }));

        setUsersData(usersArray);
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
                  <th className="py-3 ps-4">Nombre</th>
                  <th className="text-center">Edad</th>
                  <th className="text-center">División</th>
                  <th className="text-center">Género</th>
                  <th className="text-center">Puntaje Total</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, index) => (
                  <tr key={index}>
                    <td className="ps-4">{user.name}</td>
                    <td className="text-center">{user.age}</td>
                    <td className="text-center">{user.division}</td>
                    <td className="text-center">{user.gender}</td>
                    <td className="text-center">{user.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light">
            <p className="text-center text-dark fw-bold mb-0">
              Usuarios Totales:
              <span className="text-success ms-2 fs-5">
                {usersData.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
