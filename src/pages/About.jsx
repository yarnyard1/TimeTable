import React from 'react'
import { useNavigate } from 'react-router-dom'

const SECTIONS = [
  {
    icon: 'bi-pencil-square',
    title: 'Create & Manage Tasks',
    body: 'Add tasks with a title, description, date, time, and category. The form validates every field as you type, so you always know if your input is correct before you submit.',
  },
  {
    icon: 'bi-palette',
    title: 'At-a-Glance Status Colors',
    body: 'Task cards change colour automatically based on urgency. Overdue tasks appear with a red tint, tasks due today glow yellow, and upcoming tasks stay calm and white.',
  },
  {
    icon: 'bi-funnel',
    title: 'Filter by Category',
    body: 'Use the category buttons above the task list to instantly filter your view. Each category shows a live count that updates whenever you add or remove tasks.',
  },
  {
    icon: 'bi-hdd-stack',
    title: 'Your Data Stays With You',
    body: 'Everything is saved directly in your browser. Close the tab, shut down your laptop — your tasks will still be there when you return. No account, no server, no cloud required.',
  },
  {
    icon: 'bi-arrow-repeat',
    title: 'Works Across Tabs',
    body: 'Open TimePlanner Pro in two browser tabs side by side. Add or delete a task in one tab and the other updates in real time, keeping both views in sync.',
  },
  {
    icon: 'bi-bell',
    title: 'Never Miss a Deadline',
    body: 'The reminder system runs silently in the background. Every 30 seconds it checks whether any task is due and fires a browser alert at the scheduled moment.',
  },
]

function About() {
  const navigate = useNavigate()

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">About TimePlanner Pro</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: 600 }}>
          A no-nonsense task manager built to help you stay on top of what matters,
          without the noise of a full project management suite.
        </p>
      </div>

      <div className="row g-4 mb-5">
        {SECTIONS.map((s) => (
          <div key={s.title} className="col-md-6">
            <div className="card h-100 border-0 bg-light">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className={`bi ${s.icon} fs-3 text-primary`}></i>
                  <h5 className="mb-0 fw-semibold">{s.title}</h5>
                </div>
                <p className="text-muted mb-0 small">{s.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="btn btn-primary btn-lg px-5" onClick={() => navigate('/tasks')}>
          <i className="bi bi-arrow-right-circle me-2"></i>Go to My Tasks
        </button>
      </div>
    </div>
  )
}

export default About
