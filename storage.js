function read() {
    const tasks = localStorage.getItem("tasks");

    if (!tasks)
        return [];

    return JSON.parse(tasks);
}

function addTask(title) {
    const tasks = read();
    const task = { taskId: Math.floor(Math.random() * 100000), title: title }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks))
    return task;
}

function deleteTask(taskId) {
    const tasks = read();
    const updatedTasks = tasks.filter(task => task.taskId !== taskId)

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
}

export { read, addTask, deleteTask }