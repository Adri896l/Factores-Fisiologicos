# 📊 **Análisis de Factores Fisiológicos en el Rendimiento Académico** 🧠

Este cuestionario tiene como objetivo evaluar factores fisiológicos clave, como **el sueño, la fatiga, el estrés y la alimentación**, los cuales pueden tener un impacto directo en el **rendimiento académico** de los estudiantes. Las preguntas fueron diseñadas cuidadosamente para evitar que los encuestados perciban que están siendo evaluados de manera positiva, neutra o negativa, lo que fomenta respuestas **más naturales y sinceras**. 

## 🎯 **Objetivo del Proyecto**

El propósito de la aplicación es crear una plataforma web que permita:

- **Realizar encuestas** sobre factores fisiológicos que impactan el aprendizaje.
- **Almacenar las respuestas** en Firebase Realtime Database.
- **Clasificar los sentimientos** de las respuestas (positivo, neutro o negativo).
- **Recopilar al menos 40 encuestas** de estudiantes.
- **Generar gráficos estadísticos**.
- **Mostrar los análisis en tiempo real** cada vez que se agregue un nuevo dato.

## 🔧 **Tecnologías Utilizadas**

### Frontend:
- **React** con **Vite**: Para una construcción eficiente y rápida del frontend.
- **Librerías de gráficos** como **Chart.js** o **Recharts** para la visualización de datos en tiempo real.
- **CSS Personalizado** para mejorar la apariencia de los elementos visuales de la aplicación. 
- **Uso de Bootstrap** utilizado para estructurar y hacer que la aplicación sea **responsiva**, es decir, que se vea bien en dispositivos de escritorio y móviles.

### Backend:
- **Firebase Realtime Database**: Para el almacenamiento y gestión de datos en tiempo real.

### Despliegue:
- **Firebase Hosting**: Para alojar la aplicación web.


## 🖼️ **Flujo de la Aplicación**

1. **Página del Cuestionario**: Los usuarios completan una encuesta sobre su estado fisiológico y académico.
2. **Página de Análisis**: Se muestran los resultados con gráficos segmentados y clasificados por edad, género y carrera, con análisis de sentimientos.


## 📅 **Plan de Desarrollo**

1. **Desarrollo del Cuestionario**: Implementación de las 10 preguntas con opciones de clasificación de sentimiento.
2. **Conexión con Firebase**: Configuración de la base de datos y almacenamiento de respuestas.
3. **Análisis y Visualización**: Implementación de la lógica de clasificación de sentimientos y generación de gráficos en tiempo real.
4. **Despliegue y Pruebas**: Configuración de Firebase Hosting y pruebas finales.

## 🛠️ **Instalación**

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias usando **npm**:
   ```bash
   npm install
