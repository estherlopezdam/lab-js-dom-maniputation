class TaskManager {
  constructor(containerId) {
    this.containerId = containerId;
    this.tasks = [];
    this.filter = 'all'; 
  }

  setFilter(filter) {
    this.filter = filter;  // Almacenar el filtro seleccionado
    this.render();         // Renderizar las tareas basadas en el nuevo filtro
  }

  
  add(taskData) {
    const { name, priority, date } = taskData;
    this.tasks.push({
      id: crypto.randomUUID(),
      name,
      priority,
      date, 
      completed: false
    });
  
    this.render();  // Renderizar después de añadir la tarea
  }

  remove(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.render();
  }

  toggleCompleted(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
    this.render();
  }

    createTaskHTML(task) {
    const taskElement = document.createElement('li');
    taskElement.setAttribute('id', task.id);
    taskElement.classList.add('list-group-item', 'd-flex', 'gap-1', 'align-items-baseline');

    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (taskDate.getTime() > today.getTime() && !task.completed) {
      taskElement.style.backgroundColor = 'lightgreen';
    }

    if (taskDate.getTime() === today.getTime() && !task.completed) {
      taskElement.style.backgroundColor = 'lightcoral';
    }

   
    if (taskDate.getTime() < today.getTime() && !task.completed) {
      taskElement.style.backgroundColor = 'firebrick';
    }

    if (task.completed) {
      taskElement.classList.add('completed');
    }

    const taskPriority = document.createElement('img');
    taskPriority.src = `/assets/img/icons/priority/${task.priority.toLowerCase()}.svg`;
    taskPriority.alt = task.priority;
    taskPriority.classList.add('priority-icon');
    taskElement.appendChild(taskPriority);

    const taskNameElement = document.createElement('div');
    taskNameElement.classList.add('me-auto');
    if (task.completed) {
      taskNameElement.classList.add('text-decoration-line-through');
    }
  
    taskNameElement.appendChild(document.createTextNode(`${task.name} - Due: ${task.date}`));
    taskElement.appendChild(taskNameElement);

    const taskActionsElement = document.createElement('div');
    taskActionsElement.classList.add('d-flex', 'gap-2');
    taskElement.appendChild(taskActionsElement);

    if (!task.completed) {
      const removeTaskElement = document.createElement('i');
      removeTaskElement.classList.add('fa', 'fa-trash-o', 'text-danger');
      removeTaskElement.setAttribute('role', 'button');
      taskActionsElement.appendChild(removeTaskElement);

      removeTaskElement.addEventListener('click', () => {
        this.remove(task.id);
      });
    }

    const completeTaskElement = document.createElement('i');
    completeTaskElement.classList.add('fa', 'fa-check', 'text-success');
    completeTaskElement.setAttribute('role', 'button');
    taskActionsElement.appendChild(completeTaskElement);

    completeTaskElement.addEventListener('click', () => {
      this.toggleCompleted(task.id);
    });

    return taskElement;
  }

  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = '';  // Limpiar el contenedor antes de renderizar

    // Filtrar tareas basadas en la prioridad seleccionada
    const filteredTasks = this.tasks.filter(task => {
      return this.filter === 'all' || task.priority.toLowerCase() === this.filter.toLowerCase();
    });

    // Ordenar las tareas por fecha
    const sortedTasks = filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Renderizar las tareas
    sortedTasks.forEach(task => {
      const taskElement = this.createTaskHTML(task);
      container.appendChild(taskElement);
    });
  }
  
}
