import { Routes, Route, Link } from "react-router-dom";
import Cuestionario from "./pages/Cuestionario";
import Analisis from "./pages/Analisis";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function Home() {
  return (
    <div className="app-container">
      {/* 🔹 Navbar */}
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
                <Link className="nav-link menu-item" to="/analisis">Ver Análisis</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-primary text-white px-3" to="/Cuestionario">
                  📝 Responder Cuestionario
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 🔹 Sección Principal */}
      <header className="hero-section text-center text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">Tu Opinión es Importante</h1>
          <p className="lead">Ayúdanos a entender cómo los factores fisiológicos impactan en el rendimiento académico.</p>
          <Link className="btn btn-lg btn-warning text-dark fw-bold shadow-sm" to="/Cuestionario">
            ¡Participa Ahora!
          </Link>
        </div>
      </header>

      {/* 🔹 Nueva Sección: Beneficios de Participar */}
      <section className="benefits-section text-center py-5">
        <div className="container">
          <h2 className="fw-bold">¿Por qué Participar?</h2>
          <p className="lead">
            Al responder nuestro cuestionario, contribuyes a la investigación sobre el impacto de factores fisiológicos en el rendimiento académico.
          </p>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="benefit-box p-4 shadow-sm rounded">
                <h4>📈 Mejora Educativa</h4>
                <p>Los resultados ayudarán a desarrollar estrategias para mejorar el aprendizaje.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-box p-4 shadow-sm rounded">
                <h4>🔬 Investigación Científica</h4>
                <p>Apoya estudios que buscan entender la relación entre el bienestar y el desempeño académico.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-box p-4 shadow-sm rounded">
                <h4>🛡️ Confidencialidad</h4>
                <p>Tus respuestas son completamente anónimas y solo se usan con fines académicos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cuestionario" element={<Cuestionario />} />
      <Route path="/analisis" element={<Analisis />} />
    </Routes>
  );
}

export default App;
