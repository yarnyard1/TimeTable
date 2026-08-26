import React, { useState, useCallback } from 'react'
import TaskCard from './TaskCard.jsx'

const ALL = 'All'

function TaskList({ tasks, onUpdate, onDelete }) {
  const [filter, setFilter] = useState(ALL)

  const categories = [ALL, ...Array.from(new Set(tasks.map((t) => t.category)))]

  const counts = tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {})

  const filtered = filter === ALL ? tasks : tasks.filter((t) => t.category === filter)

  const handleUpdate = useCallback(
    (id, fields) => onUpdate(id, fields),
    [onUpdate]
  )
  const handleDelete = useCallback(
    (id) => onDelete(id),
    [onDelete]
  )

  return (
    <div>
      {}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {Object.entries(counts).map(([cat, count]) => (
          <span key={cat} className="badge bg-secondary fs-6">
            {cat}: {count}
          </span>
        ))}
        {tasks.length === 0 && (
          <span className="text-muted small">No tasks yet.</span>
        )}
      </div>

      {}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
            {cat !== ALL && counts[cat] ? (
              <span className="badge bg-light text-dark ms-1">{counts[cat]}</span>
            ) : null}
          </button>
        ))}
      </div>

      {}
      <div id="task-list-container">
        {filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-inbox display-4 d-block mb-2"></i>
            {tasks.length === 0
              ? 'No tasks yet. Add your first task above!'
              : `No tasks in "${filter}" category.`}
          </div>
        ) : (
          filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList
