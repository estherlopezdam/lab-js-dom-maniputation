window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED!!');

  const taskManager = new TaskManager('tasks-container', 'create-task-form');
  taskManager.add({ name: 'Task 1' });
  taskManager.add({ name: 'Task 2' });
  taskManager.add({ name: 'Task 3' });
  taskManager.add({ name: 'Task 4' });
  taskManager.render();
});