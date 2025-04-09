
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebaseConfig"; 
import { ref, push } from "firebase/database";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../components/style.css";


  const questions = [
    {
      question: "¿Cómo te sientes generalmente al despertar para comenzar tu día académico?",
      options: {
        Positivo: "Me despierto con energía y motivación.",
        Neutro: "A veces me cuesta, pero luego me activo.",
        Negativo: "Me despierto cansado/a y sin ganas de estudiar."
      }
    },
    {
      question: "¿Sientes que el sueño afecta tu rendimiento académico?",
      options: {
        Positivo: "No, duermo bien y me siento concentrado/a.",
        Neutro: "A veces sí, cuando duermo poco.",
        Negativo: "Sí, siempre me cuesta concentrarme por falta de sueño."
      }
    },
    {
      question: "¿Cómo describirías tu alimentación durante tu jornada académica?",
      options: {
        Positivo: "Me alimento bien y balanceado.",
        Neutro: "A veces como bien, a veces no.",
        Negativo: "No me alimento adecuadamente."
      }
    },
    {
      question: "¿Sientes que el hambre afecta tu concentración en clase?",
      options: {
        Positivo: "No, siempre me siento enfocado/a.",
        Neutro: "A veces, cuando no como bien.",
        Negativo: "Sí, cuando tengo hambre no puedo concentrarme."
      }
    },
    {
      question: "¿Cómo te afecta la iluminación del lugar donde estudias?",
      options: {
        Positivo: "No me afecta, me adapto bien.",
        Neutro: "A veces noto que influye en mi concentración.",
        Negativo: "Sí, una mala iluminación me dificulta estudiar."
      }
    },
    {
      question: "¿Te cuesta dormir por pensar en tareas o exámenes?",
      options: {
        Positivo: "No, puedo descansar sin problemas.",
        Neutro: "Algunas veces sí, pero no siempre.",
        Negativo: "Sí, me cuesta mucho dormir por preocupaciones."
      }
    },
    {
      question: "¿Tienes dolores de cabeza relacionados con el estudio?",
      options: {
        Positivo: "No, casi nunca tengo dolores de cabeza.",
        Neutro: "A veces, si estudio demasiado.",
        Negativo: "Sí, frecuentemente me duelen la cabeza al estudiar."
      }
    },
    {
      question: "¿Cómo te afecta el ruido ambiental al estudiar?",
      options: {
        Positivo: "No me molesta, puedo concentrarme bien.",
        Neutro: "Depende del nivel de ruido.",
        Negativo: "Sí, el ruido me desconcentra completamente."
      }
    },
    {
      question: "¿Cómo sueles sentirte al final de un día de clases o estudio?",
      options: {
        Positivo: "Con energía y satisfecho/a.",
        Neutro: "Normal, con algo de cansancio.",
        Negativo: "Muy cansado/a y agotado/a."
      }
    },
    {
      question: "¿Crees que los descansos durante el estudio te ayudan a aprender mejor?",
      options: {
        Positivo: "Sí, me ayudan mucho a rendir mejor.",
        Neutro: "A veces, pero no siempre los necesito.",
        Negativo: "No, prefiero estudiar sin interrupciones."
      }
    }
  ];
  
  const Cuestionario = () => {

    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({ name: "", email: "", age: "", gender: "", division: "", responses: {} });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleResponseChange = (questionIndex, sentiment) => {
      setFormData({
        ...formData,
        responses: { ...formData.responses, [questionIndex]: sentiment }
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const allAnswered = questions.every((_, index) => formData.responses[index] !== undefined);

      if (!allAnswered) {
        alert("Por favor, contesta todas las preguntas antes de enviar.");
        return; 
      }

      let totalScore = Object.values(formData.responses).reduce((acc, sentiment) => acc + (sentiment === "Positivo" ? 3 : sentiment === "Neutro" ? 2 : 1), 0);
      
      // Mueve el push aquí
      push(ref(database, "responses"), { ...formData, totalScore })
        .then(() => {
          alert("Respuestas enviadas correctamente.");
          setFormData({ name: "", email: "", age: "", gender: "", division: "", responses: {} }); // Limpiar formulario
          navigate("/"); // Redirigir a la página de inicio
        })
        .catch((error) => {
          console.error("Error al enviar respuestas:", error);
          alert("Hubo un error al enviar las respuestas.");
        });
    };

    return (
      <div className="app-container">
        {/* 🔹 Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              📊 Análisis Fisiológico
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
    
        <div className="container mt-5">
    
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-sm" style={{ animation: 'fadeIn 0.8s ease-in-out' }}>
            <h2 className="text-center mb-4">Cuestionario sobre Factores Fisiológicos en el Aprendizaje</h2>
    
            {/* Información personal */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
            </div>
    
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="age">Edad:</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="gender">Sexo:</label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="" disabled selected>Seleccione una opción</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no decir">Prefiero no decir</option>
                  </select>
                </div>
              </div>
            </div>
    
            <div className="form-group mb-4">
              <label htmlFor="division">División:</label>
              <select
                name="division"
                id="division"
                value={formData.division}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="" disabled selected>Seleccione una opción</option>
                <option value="Telemática">Telemática</option>
                <option value="Mecatrónica">Mecatrónica</option>
                <option value="Administración">Administración</option>
                <option value="Mercadotecnia">Mercadotecnia</option>
                <option value="Ambiental">Ambiental</option>
              </select>
            </div>
    
            {/* Preguntas */}
            {questions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="font-weight-bold">{q.question}</p>
                {Object.entries(q.options).map(([sentiment, text]) => (
                  <div key={sentiment} className="form-check">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={sentiment}
                      onChange={() => handleResponseChange(index, sentiment)}
                      required
                      className="form-check-input"
                    />
                    <label className="form-check-label">{text}</label>
                  </div>
                ))}
              </div>
            ))}
    
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
          </form>
        </div>
      {/* 🔹 Pie de página */}
      <footer className="footer bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; 2025 Análisis Fisiológico. Todos los derechos reservados.</p>
          <p>
            <Link to="/privacidad" className="text-white">Política de Privacidad</Link> | 
            <Link to="/contacto" className="text-white"> Contacto</Link>
          </p>
        </div>
      </footer>
      </div>
    );
  };
  
  export default Cuestionario;