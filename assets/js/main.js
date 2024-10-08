window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED!!');

  const taskManager = new TaskManager('tasks-container');
  taskManager.add('Task 1');
  taskManager.add('Task 2');
  taskManager.add('Task 3');
  taskManager.add('Task 4');
  taskManager.render();
});