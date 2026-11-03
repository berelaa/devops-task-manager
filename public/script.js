
// Task Manager application

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const emptyMessage = document.getElementById("emptyMessage");

// Save tasks in browser storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addNewTask() {
    const title = taskInput.value.trim();

    if (!title) {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Render all tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const title = document.createElement("span");
        title.textContent = task.title;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeButton.addEventListener("click", () => {
            toggleTaskStatus(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            removeTask(task.id);
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(title);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateStatistics();
}

// Toggle task status
function toggleTaskStatus(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

// Delete a task
function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

// Update statistics
function updateStatistics() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

    emptyMessage.style.display =
        total === 0 ? "block" : "none";
}

// Event listeners
addTaskButton.addEventListener("click", addNewTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addNewTask();
    }
});

// Initial rendering
renderTasks();
