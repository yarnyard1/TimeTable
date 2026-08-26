import React, { useEffect } from 'react'

function SuccessNotification({ message, onDismiss }) {
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onDismiss, 3000)
    return () => clearTimeout(timer)
  }, [message, onDismiss])

  if (!message) return null

  return (
    <div
      className="alert alert-success alert-dismissible d-flex align-items-center gap-2 shadow-sm mb-4"
      role="alert"
    >
      <i className="bi bi-check-circle-fill fs-5"></i>
      <span>{message}</span>
    </div>
  )
}

export default SuccessNotification
