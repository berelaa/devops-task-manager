
function addTask(tasks, title) {
    if (!title || !title.trim()) {
        throw new Error("Task title is required");
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        completed: false
    };

    return [...tasks, newTask];
}

function toggleTask(tasks, id) {
    return tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
}

function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

module.exports = {
    addTask,
    toggleTask,
    deleteTask
};
