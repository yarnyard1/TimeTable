import React, { useState, useEffect, useCallback } from 'react'
import TaskForm from '../components/TaskForm.jsx'
import TaskList from '../components/TaskList.jsx'
import SuccessNotification from '../components/SuccessNotification.jsx'
import { saveTasks, loadTasks } from '../utils/storage.js'
import { Task } from '../utils/Task.js'
import { useReminder } from '../hooks/useReminder.js'
import { useWindowSize } from '../hooks/useWindowSize.js'

function Tasks() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [successMsg, setSuccessMsg] = useState('')

  const { width } = useWindowSize()
  const isMobile = width < 768
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'timeplanner_tasks') {
        setTasks(loadTasks())
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useReminder(tasks)

  const handleAddTask = useCallback((newTask) => {
    setTasks((prev) => [newTask, ...prev])
    setSuccessMsg(`Task "${newTask.title}" added successfully!`)
  }, [])

  const handleUpdateTask = useCallback((id, fields) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const updated = new Task(
          t.id,
          fields['title'],
          fields['description'],
          fields['date'],
          fields['time'],
          fields['category']
        )
        return updated
      })
    )
  }, [])

  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const handleDismissSuccess = useCallback(() => setSuccessMsg(''), [])

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-list-task text-primary"></i> My Tasks
        </h1>
        <p className="text-muted mb-0">
          {isMobile ? 'Tap a card to edit.' : 'Click Edit on any card to modify it.'}
          {' '}Tasks: <strong>{tasks.length}</strong>
        </p>
      </div>

      <SuccessNotification message={successMsg} onDismiss={handleDismissSuccess} />

      <div className="row">
        <div className="col-lg-5 mb-4 mb-lg-0">
          <TaskForm onAddTask={handleAddTask} />
        </div>
        <div className="col-lg-7">
          <TaskList
            tasks={tasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  )
}

export default Tasks
