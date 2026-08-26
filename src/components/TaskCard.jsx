import React, { useState, useEffect, memo } from 'react'
import { TITLE_REGEX } from '../utils/Task.js'

const CATEGORIES = ['General', 'Work', 'Personal', 'Health', 'Shopping', 'Study']

const STATUS_STYLES = {
  overdue: {
    bg: 'task-card--overdue',
    badge: 'bg-danger',
    label: 'Overdue',
    icon: 'bi-exclamation-circle',
  },
  today: {
    bg: 'task-card--today',
    badge: 'bg-warning text-dark',
    label: 'Due Today',
    icon: 'bi-clock',
  },
  upcoming: {
    bg: 'task-card--upcoming',
    badge: 'bg-success',
    label: 'Upcoming',
    icon: 'bi-calendar-check',
  },
}

// Memoized — only re-renders when task data or callbacks change
const TaskCard = memo(function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [editFields, setEditFields] = useState({})
  const [editError, setEditError] = useState('')

  const status = task.getStatus()
  const style = STATUS_STYLES[status]

  const getTodayString = () => new Date().toISOString().split('T')[0]
  const getNowTimeString = () => {
    const now = new Date()
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  }

  const startEdit = () => {
    setEditFields({
      title: task.title,
      description: task.description,
      date: task.date,
      time: task.time,
      category: task.category,
    })
    setEditError('')
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
    setEditError('')
  }

  // Escape key cancels editing
  useEffect(() => {
    if (!editing) return
    const handler = (e) => {
      if (e.key === 'Escape') cancelEdit()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [editing])

  // Dynamic property access with bracket notation for updating fields
  const handleEditChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }))
  }

  const saveEdit = () => {
    setEditError('')
    try {
      if (!TITLE_REGEX.test(editFields.title)) {
        throw new Error('Title is invalid. Must be 3–60 chars, start with a letter.')
      }
      if (editFields.date < getTodayString()) {
        throw new Error('Date cannot be in the past.')
      }
      if (
        editFields.date === getTodayString() &&
        editFields.time &&
        editFields.time <= getNowTimeString()
      ) {
        throw new Error('Selected time has already passed today.')
      }
      // Pass updated fields using bracket notation in onUpdate
      onUpdate(task.id, editFields)
      setEditing(false)
    } catch (err) {
      setEditError(err.message)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Delete task "${task.title}"? This cannot be undone.`)) {
      onDelete(task.id)
    }
  }

  const truncate = (str, max = 80) =>
    str && str.length > max ? str.slice(0, max) + '…' : str

  if (editing) {
    return (
      <div className={`card mb-3 shadow-sm task-card ${style.bg}`}>
        <div className="card-body">
          <h6 className="card-title text-muted mb-3">
            <i className="bi bi-pencil me-1"></i>Editing Task
          </h6>
          {editError && (
            <div className="alert alert-danger py-2 small mb-3">
              <i className="bi bi-exclamation-triangle me-1"></i>{editError}
            </div>
          )}

          <div className="mb-2">
            <label className="form-label small fw-semibold">Title</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={editFields.title}
              onChange={(e) => handleEditChange('title', e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label small fw-semibold">Description</label>
            <textarea
              className="form-control form-control-sm"
              rows={2}
              value={editFields.description}
              onChange={(e) => handleEditChange('description', e.target.value)}
            />
          </div>

          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="form-label small fw-semibold">Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={editFields.date}
                min={getTodayString()}
                onChange={(e) => handleEditChange('date', e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label small fw-semibold">Time</label>
              <input
                type="time"
                className="form-control form-control-sm"
                value={editFields.time}
                onChange={(e) => handleEditChange('time', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold">Category</label>
            <select
              className="form-select form-select-sm"
              value={editFields.category}
              onChange={(e) => handleEditChange('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-primary" onClick={saveEdit}>
              <i className="bi bi-check-lg me-1"></i>Save
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>
              <i className="bi bi-x-lg me-1"></i>Cancel
            </button>
          </div>
          <p className="text-muted small mt-2 mb-0">Press Esc to cancel</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`card mb-3 shadow-sm task-card ${style.bg}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title mb-0 fw-semibold">{task.title}</h6>
          <span className={`badge ${style.badge} d-flex align-items-center gap-1`}>
            <i className={`bi ${style.icon}`}></i>{style.label}
          </span>
        </div>

        {task.description && (
          <p className="card-text text-muted small mb-2">{truncate(task.description)}</p>
        )}

        <div className="d-flex flex-wrap gap-2 small text-muted mb-3">
          <span>
            <i className="bi bi-calendar3 me-1"></i>{task.getFormattedDate()}
          </span>
          {task.time && (
            <span>
              <i className="bi bi-clock me-1"></i>{task.time}
            </span>
          )}
          <span className="badge bg-secondary">{task.category}</span>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={startEdit}>
            <i className="bi bi-pencil me-1"></i>Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            data-task-id={task.id}
            onClick={handleDelete}
          >
            <i className="bi bi-trash me-1"></i>Delete
          </button>
        </div>
      </div>
    </div>
  )
})

export default TaskCard
