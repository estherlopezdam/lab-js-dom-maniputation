window.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager('tasks-container');

  // Formulario para añadir tareas
  const taskForm = document.getElementById('create-task-form');
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value;

    taskManager.add({ name: taskName, priority: taskPriority, date: taskDate });

    taskForm.reset(); // Limpiar el formulario después de añadir la tarea
  });

  // Capturamos el cambio en el filtro de prioridad
  const priorityButtons = document.querySelectorAll('#task-priority-filter button');
  priorityButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const selectedPriority = event.currentTarget.getAttribute('data-priority');
      taskManager.setFilter(selectedPriority);
    });
  });

  taskManager.render(); // Render inicial
});
