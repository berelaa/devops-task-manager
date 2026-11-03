
const {
    addTask,
    toggleTask,
    deleteTask
} = require("../src/taskManager");

// Test 1: Adding a new task
test("should add a new task", () => {
    const tasks = [];

    const result = addTask(tasks, "Learn DevOps");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Learn DevOps");
    expect(result[0].completed).toBe(false);
});

// Test 2: Completing a task
test("should toggle task completion", () => {
    const tasks = [
        { id: 1, title: "Learn Git", completed: false }
    ];

    const result = toggleTask(tasks, 1);

    expect(result[0].completed).toBe(true);
});

// Test 3: Deleting a task
test("should delete a task", () => {
    const tasks = [
        { id: 1, title: "Learn Git", completed: false }
    ];

    const result = deleteTask(tasks, 1);

    expect(result).toHaveLength(0);
});

// Test 4: Rejecting an empty task
test("should reject an empty task title", () => {
    expect(() => addTask([], "   ")).toThrow(
        "Task title is required"
    );
});
