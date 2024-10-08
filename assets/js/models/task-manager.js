class TaskManager {

  constructor(containerId) {
    this.containerId = containerId;
    this.tasks = [];
  }

  add(name) {
    this.tasks.push({ id: self.crypto.randomUUID(), name });
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  buildTaskHTML(task) {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('id', task.id);
    taskNode.classList.add('list-group-item');
    taskNode.appendChild(document.createTextNode(task.name));

    taskNode.addEventListener('click', () => {
      this.delete(task.id);
      this.render();
    });

    return taskNode;
  }

  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = '';

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      container.appendChild(this.buildTaskHTML(task));
    }
  }

}
