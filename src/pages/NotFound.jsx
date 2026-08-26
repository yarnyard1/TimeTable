import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="container py-5 text-center">
      <div className="mb-4">
        <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '5rem' }}></i>
      </div>
      <h1 className="display-1 fw-bold text-muted">404</h1>
      <h2 className="fw-semibold mb-3">Page Not Found</h2>
      <p className="text-muted mb-4 lead">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        className="btn btn-primary btn-lg px-5"
        onClick={() => navigate('/')}
      >
        <i className="bi bi-house me-2"></i>Back to Home
      </button>
    </div>
  )
}

export default NotFound
