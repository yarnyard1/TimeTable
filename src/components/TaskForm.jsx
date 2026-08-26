import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TITLE_REGEX } from '../utils/Task.js'
import { Task } from '../utils/Task.js'

const CATEGORIES = ['General', 'Work', 'Personal', 'Health', 'Shopping', 'Study']

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [category, setCategory] = useState('General')

  const [titleFeedback, setTitleFeedback] = useState(null) // { valid, message }
  const [dateFeedback, setDateFeedback] = useState(null)
  const [timeFeedback, setTimeFeedback] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const titleRef = useRef(null)

  // Auto-focus title on mount
  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const getTodayString = () => new Date().toISOString().split('T')[0]

  const getNowTimeString = () => {
    const now = new Date()
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  }

  // Real-time title validation
  const handleTitleChange = (e) => {
    const val = e.target.value
    setTitle(val)
    if (!val) {
      setTitleFeedback(null)
      return
    }
    if (TITLE_REGEX.test(val)) {
      setTitleFeedback({ valid: true, message: '✓ Title looks good' })
    } else {
      let reason = 'Invalid title. '
      if (val.length < 3) reason += 'Must be at least 3 characters.'
      else if (val.length > 60) reason += 'Must be 60 characters or fewer.'
      else if (!/^[A-Za-z]/.test(val)) reason += 'Must start with a letter.'
      else reason += "Only letters, numbers, spaces, hyphens, and apostrophes allowed."
      setTitleFeedback({ valid: false, message: reason })
    }
  }

  // Real-time date validation
  const handleDateChange = (e) => {
    const val = e.target.value
    setDate(val)
    setTimeFeedback(null)
    if (!val) { setDateFeedback(null); return }
    if (val < getTodayString()) {
      setDateFeedback({ valid: false, message: '✗ Date cannot be in the past.' })
    } else {
      setDateFeedback({ valid: true, message: '✓ Date is valid.' })
    }
  }

  // Real-time time validation (only when today is selected)
  const handleTimeChange = (e) => {
    const val = e.target.value
    setTime(val)
    if (!val || !date) { setTimeFeedback(null); return }
    if (date === getTodayString() && val <= getNowTimeString()) {
      setTimeFeedback({ valid: false, message: '✗ Time has already passed today.' })
    } else {
      setTimeFeedback({ valid: true, message: '✓ Time is valid.' })
    }
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDate('')
    setTime('')
    setCategory('General')
    setTitleFeedback(null)
    setDateFeedback(null)
    setTimeFeedback(null)
    setSubmitError('')
  }

  const handleSubmit = useCallback(() => {
    setSubmitError('')
    try {
      // Structured error handling with descriptive thrown errors
      if (!title) throw new Error('Title is required.')
      if (!TITLE_REGEX.test(title)) throw new Error('Title is invalid. ' + (titleFeedback?.message || ''))
      if (!date) throw new Error('Date is required.')
      if (date < getTodayString()) throw new Error('Date cannot be in the past.')
      if (date === getTodayString() && time && time <= getNowTimeString()) {
        throw new Error('The selected time has already passed today.')
      }

      const newTask = new Task(
        Date.now().toString(),
        title,
        description,
        date,
        time,
        category
      )
      onAddTask(newTask)
      resetForm()
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      // Focus always returns to title whether success or failure
      titleRef.current?.focus()
    }
  }, [title, description, date, time, category, titleFeedback, onAddTask])

  // Pressing Enter submits (but not inside the description textarea)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white fw-semibold d-flex align-items-center gap-2">
        <i className="bi bi-plus-circle"></i> Add New Task
      </div>
      <div className="card-body" onKeyDown={handleKeyDown}>
        {submitError && (
          <div className="alert alert-danger py-2 small">
            <i className="bi bi-exclamation-triangle me-1"></i>{submitError}
          </div>
        )}

        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Title <span className="text-danger">*</span></label>
          <input
            ref={titleRef}
            type="text"
            className={`form-control ${titleFeedback ? (titleFeedback.valid ? 'is-valid' : 'is-invalid') : ''}`}
            value={title}
            onChange={handleTitleChange}
            placeholder="e.g. Morning workout"
            maxLength={60}
          />
          {titleFeedback && (
            <div className={`small mt-1 ${titleFeedback.valid ? 'text-success' : 'text-danger'}`}>
              {titleFeedback.message}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional details…"
          />
        </div>

        {/* Date & Time */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Date <span className="text-danger">*</span></label>
            <input
              type="date"
              className={`form-control ${dateFeedback ? (dateFeedback.valid ? 'is-valid' : 'is-invalid') : ''}`}
              value={date}
              min={getTodayString()}
              onChange={handleDateChange}
            />
            {dateFeedback && (
              <div className={`small mt-1 ${dateFeedback.valid ? 'text-success' : 'text-danger'}`}>
                {dateFeedback.message}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Time</label>
            <input
              type="time"
              className={`form-control ${timeFeedback ? (timeFeedback.valid ? 'is-valid' : 'is-invalid') : ''}`}
              value={time}
              onChange={handleTimeChange}
            />
            {timeFeedback && (
              <div className={`small mt-1 ${timeFeedback.valid ? 'text-success' : 'text-danger'}`}>
                {timeFeedback.message}
              </div>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
            <i className="bi bi-check-lg me-1"></i>Add Task
          </button>
          <button className="btn btn-outline-secondary" onClick={resetForm}>
            <i className="bi bi-x-lg me-1"></i>Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskForm
