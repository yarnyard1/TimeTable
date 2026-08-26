import { Task } from './Task.js';
const STORAGE_KEY = 'timeplanner_tasks';
const TASK_SEPARATOR = ';';
const FIELD_SEPARATOR = '|';

export function saveTasks(tasksArray) {
  const serialized = tasksArray
    .map((t) =>
      [t.id, t.title, t.description, t.date, t.time, t.category].join(
        FIELD_SEPARATOR
      )
    )
    .join(TASK_SEPARATOR);
  localStorage.setItem(STORAGE_KEY, serialized);
}

export function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  return raw
    .split(TASK_SEPARATOR)
    .filter(Boolean)
    .reduce((acc, chunk) => {
      const [id, title, description, date, time, category] =
        chunk.split(FIELD_SEPARATOR);
      try {
        const task = new Task(id, title, description, date, time, category);
        acc.push(task);
      } catch {
      }
      return acc;
    }, []);
}
