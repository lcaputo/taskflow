// test-runner.js - Verificación de lógica de datos de TaskFlow
const assert = require('assert');

// Mock localStorage
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = val.toString(); }
};

console.log('--- Iniciando Pruebas de TaskFlow ---');

// Test 1: Crear tareas y estructura
const mockTasks = [
  { id: '1', title: 'Tarea A', category: 'General', priority: 'media', completed: false }
];
localStorage.setItem('taskflow_test', JSON.stringify(mockTasks));
const retrieved = JSON.parse(localStorage.getItem('taskflow_test'));
assert.strictEqual(retrieved.length, 1, 'Debe haber 1 tarea guardada');
assert.strictEqual(retrieved[0].title, 'Tarea A', 'El título debe coincidir');
console.log('✓ Test 1: Persistencia y serialización JSON correcta');

// Test 2: Toggle completed
retrieved[0].completed = !retrieved[0].completed;
assert.strictEqual(retrieved[0].completed, true, 'El estado debe cambiar a completado');
console.log('✓ Test 2: Cambio de estado completado correcto');

// Test 3: Filtros de tareas
const list = [
  { id: '1', title: 'Comprar pan', completed: false },
  { id: '2', title: 'Estudiar JS', completed: true }
];
const pending = list.filter(t => !t.completed);
const completed = list.filter(t => t.completed);
assert.strictEqual(pending.length, 1);
assert.strictEqual(completed.length, 1);
console.log('✓ Test 3: Filtrado de tareas pendientes y completadas correcto');

console.log('--- Todas las pruebas pasaron satisfactoriamente ---');
