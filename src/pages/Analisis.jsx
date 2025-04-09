import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../components/analisis.css"; 
import UsersByDivision from "./UsersByDivision";
import UsersByAge from "./UsersByAge";
import UsersByGender from "./UsersByGender";
import UsersBySentiment from "./UsersBySentiment";
import UsersTotal from "./UsersTotal";

export default function SurveyAnalysis() {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  
  const analysisOptions = [
    { 
      label: " 🔹 Usuarios por División", 
      content: <UsersByDivision /> 
    },
    { 
      label: " 📊 Edad", 
      content: <UsersByAge />  
    },
    { 
      label: " ⚧ Género", 
      content: <UsersByGender />
    },
    { 
      label: " 😊 Análisis de Sentimientos", 
      content: <UsersBySentiment />
    },
    { 
      label: " 📍 Usuarios Totales", 
      content: <UsersTotal /> 
    }
  ];

  return (
    <div className="analysis-container-gh">
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            📊 Análisis Fisiológico
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link btn btn-primary text-white px-3" to="/Cuestionario">
                  📝 Responder Cuestionario
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
       
    <div className="analysis">

        {/* Panel de Análisis */}
        <div className="analysis-panel text-center">
          <h2 className="title">📊 Análisis de Encuestas</h2>

          <div className="buttons-container">
            {analysisOptions.map((option, index) => (
              <button
                key={index}
                className={`analysis-btn ${selectedAnalysis === option.label ? "active" : ""}`}
                onClick={() => setSelectedAnalysis(option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>

           {/*Contenido Dinámico */}
           <div className="analysis-content">
            {selectedAnalysis ? (
              <div className="content-box">
                <h3>{selectedAnalysis}</h3>
                {analysisOptions
                  .filter((option) => option.label === selectedAnalysis)  
                  .map((option) => option.content)} 
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
