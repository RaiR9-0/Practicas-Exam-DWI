const nuevaTareaInput = document.getElementById('nuevaTarea');
const listaTareas = document.getElementById('listaTareas');

let tareas = [];

function renderTasks() {
  listaTareas.innerHTML = '';

  const pendientes = tareas.filter(t => !t.completada);
  const completadas = tareas.filter(t => t.completada);

  [...pendientes, ...completadas].forEach((tarea) => {
    const li = document.createElement('li');
    li.className = 'tarea' + (tarea.completada ? ' completada' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.completada;
    checkbox.addEventListener('change', () => {
      tarea.completada = checkbox.checked;
      renderTasks();
    });

    const span = document.createElement('span');
    span.textContent = tarea.descripcion;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
      tareas = tareas.filter(t => t !== tarea);
      renderTasks();
    });

    li.append(checkbox, span, botonEliminar);
    listaTareas.appendChild(li);
  });
}

nuevaTareaInput.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter' && nuevaTareaInput.value.trim() !== '') {
    tareas.push({ descripcion: nuevaTareaInput.value.trim(), completada: false });
    nuevaTareaInput.value = '';
    renderTasks();
  }
});
