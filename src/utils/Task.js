// Task Constructor Function
//
// Regex pattern for title validation: /^[A-Za-z0-9\s]{3,50}$/
//
// TODO: Complete the constructor function
// Use 'this' to assign the following properties:
//   - id: a unique identifier (you can use Date.now().toString())
//   - title: the task title
//   - description: the task description
//   - date: the task date
//   - time: the task time

function Task(title, description, date, time) {
  // Your code here
}

// TODO: Add a getFormattedDate method on Task.prototype
// This method should return the date in a readable format
// Example: return new Date(this.date).toLocaleDateString()

// =====================================================
// BONUS: Add a setTitle method on Task.prototype
// This method should validate the new title before setting it
// Throw an Error if the title is invalid
// =====================================================

// =====================================================
// Storage Helper Functions
// localStorage stores strings only
// Use split() and join() with separators to convert data
// Field separator: |  (between properties of one task)
// Task separator: ;   (between different tasks)
// =====================================================

// TODO: Create a saveTasks function that:
//   - Takes an array of tasks
//   - Converts each task to a string using join("|") with its properties
//   - Joins all task strings using join(";")
//   - Saves the result to localStorage with the key "tasks"

function saveTasks(tasks) {
  // Your code here
}

// TODO: Create a loadTasks function that:
//   - Gets the stored string from localStorage using the key "tasks"
//   - If no data exists, return an empty array
//   - Splits the string by ";" to get individual task strings
//   - Splits each task string by "|" to get the properties
//   - Creates a new Task object for each using the constructor
//   - Returns the array of Task objects

function loadTasks() {
  // Your code here
}

export { Task, saveTasks, loadTasks };
