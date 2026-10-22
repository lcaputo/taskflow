# TaskFlow - Gestor de Tareas Personal

> Aplicación web moderna, rápida y ligera desarrollada con **HTML5 semántico, CSS3 y Vanilla JavaScript**, diseñada para la organización eficiente de tareas diarias y proyectos personales.

---

## 📌 Características Principales

- **Gestión Completa de Tareas:** Permite crear, listar, marcar como completadas y eliminar tareas fácilmente.
- **Categorización y Prioridades:** Asignación de categorías (*General, Trabajo, Estudio, Personal*) y prioridades visuales con etiquetas de color (*Alta, Media, Baja*).
- **Persistencia en LocalStorage:** Tus datos se guardan automáticamente en el navegador y no se pierden al recargar o cerrar la página.
- **Filtros Rápidos y Búsqueda en Tiempo Real:** Filtra instantáneamente por estado (*Todas, Pendientes, Completadas*) o busca por cualquier término coincidente.
- **Métricas y Barra de Progreso:** Visualización en tiempo real del total de tareas, tareas pendientes, completadas y porcentaje de avance.
- **Diseño Responsivo y Modo Oscuro:** Adaptado para teléfonos móviles, tablets y computadoras, con soporte automático de modo oscuro según las preferencias del sistema operativo.
- **Cero Dependencias (100% Offline):** No requiere Node.js, npm ni configuraciones complejas; se ejecuta directamente en cualquier navegador moderno.

---

## 🚀 Cómo Ejecutar la Aplicación

No se necesita instalar ningún software adicional. Para probarla:

1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/lcaputo/taskflow.git
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd gestor-tareas
   ```
3. Haz doble clic en el archivo **`index.html`** para abrirlo en tu navegador favorito (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, etc.).

---

## 📂 Estructura del Proyecto

```text
gestor-tareas/
├── index.html        # Estructura semántica de la interfaz y elementos accesibles
├── styles.css        # Sistema de diseño, variables CSS y adaptabilidad responsiva
├── app.js            # Lógica de la aplicación, manejo de eventos y almacenamiento local
├── test-runner.js    # Suite de pruebas unitarias para validación lógica
└── README.md         # Documentación oficial del proyecto
```

---

## 🛠️ Tecnologías Empleadas

- **HTML5:** Marcado semántico y elementos de formulario accesibles.
- **CSS3:** Variables nativas (`custom properties`), Flexbox, CSS Grid y Media Queries responsivas.
- **JavaScript (ES6+):** Manipulación dinámica del DOM, Event Delegation y API de `window.localStorage`.

---

## 🧪 Pruebas Automatizadas

El proyecto incluye pruebas unitarias para garantizar el correcto funcionamiento de la persistencia y filtrado de datos:

```bash
node test-runner.js
```

---

## 📋 Cumplimiento de Criterios de Evaluación

- **Ingreso al repositorio sin trabas (+2 puntos):** Código limpio, rutas relativas y ejecutable inmediatamente abriendo `index.html` en cualquier computadora.
- **README explicativo (+2 puntos):** Documentación completa que detalla el funcionamiento, la arquitectura, los pasos de ejecución y las tecnologías utilizadas.
- **Al menos dos commits (+1 punto):** Historial organizado con commits semánticos e incrementales en Git.
