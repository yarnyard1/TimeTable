// Tasks Page
// TODO: Import useState, useEffect, and useCallback from React
// TODO: Import TaskForm and TaskList components
// TODO: Import the Task constructor from utils/Task.js
// TODO: Import saveTasks and loadTasks from utils/Task.js
//
// TODO: Create a Tasks component that:
//   - Manages the tasks array in state (useState)
//   - Loads tasks from localStorage on mount (useEffect)
//   - Saves tasks to localStorage when tasks change (useEffect)
//   - Defines handler functions: handleAddTask, handleDeleteTask, handleEditTask
//   - Wraps handler functions with useCallback for stable references
//   - Renders TaskForm (pass handleAddTask as prop)
//   - Renders TaskList (pass tasks, handlers, and filter as props)
//
// TODO: Display the number of tasks in each category above the task list
//   - Count how many tasks exist in each category (Work, Personal, Study)
//   - Display each category name with its count
//   - Counts must update automatically when tasks are added or removed
//
// TODO: Add a category filter
//   - Provide a way for users to select a category
//   - When a category is selected, only tasks in that category are shown
//   - An "All" option shows every task
//
// Reminder: localStorage stores strings only
// Use split() and join() with separators to convert between strings and arrays
// Field separator: |
// Task separator: ;
//
// TODO: Export the component as default
