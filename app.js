/**
 * TaskFlow - Aplicación de Gestión de Tareas
 * Implementación con Vanilla JavaScript y LocalStorage
 */

// 1. Constantes y Claves de Almacenamiento
const STORAGE_KEY = 'taskflow_data_v1';

// 2. Estado de la Aplicación
let tasks = [];
let currentFilter = 'all';
let searchQuery = '';

// 3. Referencias al DOM
const elements = {
  form: document.getElementById('task-form'),
  input: document.getElementById('task-input'),
  category: document.getElementById('task-category'),
  priority: document.getElementById('task-priority'),
  tasksContainer: document.getElementById('tasks-container'),
  emptyState: document.getElementById('empty-state'),
  searchInput: document.getElementById('search-input'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  statTotal: document.getElementById('stat-total'),
  statPending: document.getElementById('stat-pending'),
  statCompleted: document.getElementById('stat-completed'),
  progressBar: document.getElementById('progress-bar'),
  progressText: document.getElementById('progress-text')
};

// 4. Funciones de Persistencia
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : getInitialDefaultTasks();
  } catch (error) {
    console.error('Error al cargar tareas desde LocalStorage:', error);
    tasks = getInitialDefaultTasks();
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error al guardar tareas en LocalStorage:', error);
  }
}

function getInitialDefaultTasks() {
  return [
    {
      id: 'task-1',
      title: 'Revisar la rúbrica del proyecto',
      category: 'Estudio',
      priority: 'alta',
      completed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-2',
      title: 'Crear repositorio en GitHub con 2 o más commits',
      category: 'Trabajo',
      priority: 'alta',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-3',
      title: 'Redactar el archivo README con instrucciones claras',
      category: 'Estudio',
      priority: 'media',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ];
}

// 5. Mutaciones de Estado
function addTask(title, category, priority) {
  const newTask = {
    id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    title: title.trim(),
    category,
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.unshift(newTask);
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// 6. Filtrado y Métricas
function getFilteredTasks() {
  return tasks.filter(task => {
    // Filtro por estado
    if (currentFilter === 'pending' && task.completed) return false;
    if (currentFilter === 'completed' && !task.completed) return false;

    // Filtro por búsqueda
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchCat = task.category.toLowerCase().includes(query);
      return matchTitle || matchCat;
    }

    return true;
  });
}

function updateMetrics() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  elements.statTotal.textContent = total;
  elements.statPending.textContent = pending;
  elements.statCompleted.textContent = completed;
  elements.progressBar.style.width = `${percentage}%`;
  elements.progressText.textContent = `${percentage}% completado`;
}

// 7. Renderizado en el DOM
function render() {
  const filtered = getFilteredTasks();
  elements.tasksContainer.innerHTML = '';

  if (filtered.length === 0) {
    elements.emptyState.style.display = 'block';
  } else {
    elements.emptyState.style.display = 'none';

    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.setAttribute('data-id', task.id);

      const mainCol = document.createElement('div');
      mainCol.className = 'task-main-col';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', `Marcar como ${task.completed ? 'pendiente' : 'completada'}`);
      checkbox.addEventListener('change', () => toggleTask(task.id));

      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.title;

      mainCol.appendChild(checkbox);
      mainCol.appendChild(textSpan);

      const metaCol = document.createElement('div');
      metaCol.className = 'task-meta';

      const catBadge = document.createElement('span');
      catBadge.className = 'badge badge-category';
      catBadge.textContent = task.category;

      const prioBadge = document.createElement('span');
      prioBadge.className = `badge badge-priority-${task.priority}`;
      prioBadge.textContent = task.priority;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn-delete';
      deleteBtn.innerHTML = '&times;';
      deleteBtn.title = 'Eliminar tarea';
      deleteBtn.setAttribute('aria-label', 'Eliminar tarea');
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      metaCol.appendChild(catBadge);
      metaCol.appendChild(prioBadge);
      metaCol.appendChild(deleteBtn);

      li.appendChild(mainCol);
      li.appendChild(metaCol);
      elements.tasksContainer.appendChild(li);
    });
  }

  updateMetrics();
}

// 8. Inicialización y Event Listeners
function init() {
  loadTasks();
  render();

  // Enviar formulario
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = elements.input.value;
    const category = elements.category.value;
    const priority = elements.priority.value;

    if (title.trim()) {
      addTask(title, category, priority);
      elements.input.value = '';
      elements.input.focus();
    }
  });

  // Búsqueda en vivo
  elements.searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    render();
  });

  // Botones de filtro
  elements.filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      render();
    });
  });
}

// Iniciar al cargar el documento
document.addEventListener('DOMContentLoaded', init);
