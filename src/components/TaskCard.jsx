// TaskCard Component
// TODO: Import React (for React.memo)
//
// Props: task (object), onDeleteTask (callback function), onEditTask (callback function)
//
// TODO: Create a TaskCard component that:
//   - Displays the task title, description, date, and time
//   - Displays the task category as a label
//   - Displays a status label (overdue, due today, or upcoming)
//   - Uses the task's getFormattedDate() method to display the date
//   - Applies dynamic inline styles based on task status:
//       Overdue tasks: light red background
//       Due today: light yellow background
//       Future tasks: default white background
//   - Has a Delete button that:
//       Shows a confirm() dialog before deleting
//       Calls onDeleteTask(task.id) if confirmed
//   - Has an Edit button that switches the card to editing mode
//   - Uses Bootstrap card classes for styling
//
// TODO: Implement inline editing that allows the user to edit:
//   - Title, description, date, time, and category
//   - Validate that date is not in the past during editing
//   - Validate that time is not in the past if today is selected during editing
//   - Use bracket notation (task[fieldName]) when applying updates
//   - Pressing Escape must cancel editing and restore original values
//   - Call onEditTask(task.id, updates) when the user saves
//
// TODO: Wrap the component with React.memo before exporting
// TODO: Export the component as default
