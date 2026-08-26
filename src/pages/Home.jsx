import React from 'react'
import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: 'bi-shield-check',
    color: 'text-primary',
    title: 'Smart Validation',
    desc: 'Every input is checked as you type. Instant red/green feedback keeps your task data clean and reliable.',
  },
  {
    icon: 'bi-hdd-stack',
    color: 'text-success',
    title: 'Persistent Storage',
    desc: 'Tasks survive browser restarts. Open a new tab and your tasks are right there — no accounts needed.',
  },
  {
    icon: 'bi-bell',
    color: 'text-warning',
    title: 'Smart Reminders',
    desc: 'The app checks every 30 seconds and alerts you the moment a task comes due.',
  },
  {
    icon: 'bi-funnel',
    color: 'text-info',
    title: 'Category Filters',
    desc: 'Organise tasks into Work, Personal, Health and more. Filter instantly and see live counts per category.',
  },
  {
    icon: 'bi-arrow-repeat',
    color: 'text-danger',
    title: 'Cross-Tab Sync',
    desc: 'Add a task in one browser tab and it appears in every other open tab instantly.',
  },
  {
    icon: 'bi-phone',
    color: 'text-secondary',
    title: 'Responsive Design',
    desc: 'Works beautifully on desktop and mobile. The layout adapts as you resize your browser.',
  },
]

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {}
      <div className="hero-section text-white text-center py-5 px-3">
        <div className="container">
          <div className="hero-badge mb-3">
            <i className="bi bi-clock-history me-2"></i>Productivity Reimagined
          </div>
          <h1 className="display-4 fw-bold mb-3">
            Get things done<br />
            <span className="hero-accent">on your terms.</span>
          </h1>
          <p className="lead mb-4 mx-auto hero-subtitle">
            TimePlanner Pro gives you a clean, fast task manager with real-time validation,
            smart reminders, and data that persists — no sign-up required.
          </p>
          <button
            className="btn btn-light btn-lg fw-semibold px-5 shadow hero-cta"
            onClick={() => navigate('/tasks')}
          >
            <i className="bi bi-arrow-right-circle me-2"></i>Open My Tasks
          </button>
        </div>
      </div>

      {}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-2">Everything you need</h2>
        <p className="text-center text-muted mb-5">
          Built for focus. Designed to stay out of your way.
        </p>
        <div className="row g-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="col-sm-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm feature-card">
                <div className="card-body p-4">
                  <i className={`bi ${f.icon} ${f.color} fs-2 mb-3 d-block`}></i>
                  <h5 className="fw-semibold mb-2">{f.title}</h5>
                  <p className="text-muted mb-0 small">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button
            className="btn btn-primary btn-lg px-5 fw-semibold"
            onClick={() => navigate('/tasks')}
          >
            <i className="bi bi-plus-circle me-2"></i>Start Adding Tasks
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
