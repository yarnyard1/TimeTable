// TaskList Component
// TODO: Import TaskCard component
//
// Props: tasks (array), onDeleteTask (callback function),
//        onEditTask (callback function), filterCategory (string)
//
// TODO: Create a TaskList component that:
//   - Filters the tasks array based on the selected category
//       If filterCategory is "All", show every task
//       Otherwise, show only tasks matching the selected category
//   - Checks if the filtered array is empty
//       If empty: render a "No tasks yet" message
//       If not empty: render the list of tasks
//   - Uses .map() to render a TaskCard for each task
//   - Passes a unique key prop to each TaskCard
//   - Passes task data, onDeleteTask, and onEditTask to each TaskCard
//   - Uses Bootstrap grid classes (row, col) for layout
//
// TODO: Implement event delegation for delete actions
//   - Attach a single click handler to the task list container
//   - Use event.target to identify which delete button was clicked
//   - Read the task id from the button's data attribute
//   - Show a confirm() dialog before calling onDeleteTask
//
// TODO: Export the component as default
