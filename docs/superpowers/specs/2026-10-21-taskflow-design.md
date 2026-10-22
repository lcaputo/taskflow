# Documento de Diseño: TaskFlow (Gestor de Tareas)

**Fecha:** 2026-10-21  
**Estado:** Aprobado  
**Objetivo:** Desarrollar una aplicación web interactiva sencilla, robusta y accesible que cumpla con los requisitos del entregable académico.

---

## 1. Contexto y Objetivos

El entregable solicita:
1. Una aplicación funcional creada a partir de requisitos propios sin excesiva complejidad.
2. Repositorio en GitHub/GitLab accesible y ejecutable sin trabas (+2 puntos).
3. Archivo `README.md` que explique claramente el funcionamiento y ejecución (+2 puntos).
4. Al menos dos commits en el historial Git (+1 punto).

**Solución seleccionada:** **TaskFlow**, una aplicación web cliente (SPA ligera) desarrollada en Vanilla JavaScript, HTML5 y CSS3, con persistencia local (`localStorage`), diseño responsivo y sin dependencias de instalación o empaquetadores.

---

## 2. Arquitectura del Sistema

La aplicación sigue una arquitectura desacoplada en tres capas lógicas dentro de archivos separados:

```text
gestor-tareas/
├── index.html        # Estructura semántica, accesibilidad y contenedores
├── styles.css        # Sistema de diseño, temas, componentes y responsividad
├── app.js            # Estado de la aplicación, controladores de eventos y almacenamiento
├── README.md         # Documentación para el docente / evaluador
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-10-21-taskflow-design.md
```

### 2.1 Modelo de Datos (Task)
Cada tarea se representa mediante un objeto JSON:
```typescript
interface Task {
  id: string;               // UUID generado con crypto.randomUUID() o timestamp
  title: string;            // Título de la tarea (obligatorio, sanitizado)
  description: string;      // Detalle opcional
  category: 'Trabajo' | 'Estudio' | 'Personal' | 'General';
  priority: 'alta' | 'media' | 'baja';
  completed: boolean;       // Estado de finalización
  createdAt: string;        // Fecha ISO 8601
}
```

### 2.2 Flujo de Datos y Estado
- **Estado central (`tasks`):** Array en memoria sincronizado en cada mutación (creación, edición, toggle, borrado) con `localStorage.getItem('taskflow_tasks')` y `localStorage.setItem('taskflow_tasks', ...)`.
- **Filtros reactivos:** Búsqueda textual y selector de estado (`todas`, `pendientes`, `completadas`).
- **Renderizado determinista:** La función `render()` redibuja la lista a partir del estado filtrado, garantizando consistencia en la UI.

---

## 3. Componentes de la Interfaz

1. **Encabezado y Métricas:**
   - Nombre de la app y resumen visual (Total, Pendientes, Completadas, % de progreso).
2. **Formulario de Entrada:**
   - Input de título, selector de prioridad y selector de categoría.
   - Validación simple (evita tareas vacías) y botón de adición con atajo de teclado (`Enter`).
3. **Barra de Herramientas / Filtros:**
   - Campo de búsqueda en vivo.
   - Pestañas/botones de filtro: *Todas*, *Pendientes*, *Completadas*.
4. **Lista de Tareas:**
   - Tarjetas individuales con checkbox de estado, badge de prioridad coloreado, botón para eliminar y opción de edición rápida.
   - Estado vacío (*Empty State*) amigable cuando no hay elementos.

---

## 4. Estrategia de Git y Entregable

Para garantizar la calificación máxima (5/5):
- **Commit 1:** Inicialización del repositorio y estructura base (`feat: maquetacion inicial HTML y estilos CSS`).
- **Commit 2:** Lógica de negocio, persistencia LocalStorage y documentación (`feat: logica interactiva en JS, persistencia y README detallado`).
- **README.md:** Incluye descripción general, instrucciones de apertura inmediata (hacer doble clic en `index.html`), explicación de funcionalidades, captura/estructura y consideraciones técnicas.

---

## 5. Criterios de Aceptación
- [x] Funciona de forma autónoma sin necesidad de ejecutar `npm install` ni servidores locales.
- [x] Persiste los datos tras recargar el navegador.
- [x] Maneja entradas vacías y previene inyección de código básico (`textContent` en lugar de `innerHTML` no sanitizado).
- [x] Historial Git con múltiples commits bien estructurados.
