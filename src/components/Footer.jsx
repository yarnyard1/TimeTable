import React from 'react'

function Footer() {
  const browserLanguage = navigator.language || navigator.userLanguage || 'Unknown'

  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <span className="text-muted small">
          &copy; {new Date().getFullYear()} TimePlanner Pro. All rights reserved.
        </span>
        <span className="text-muted small d-flex align-items-center gap-1">
          <i className="bi bi-globe2"></i>
            <h6 className="text-white" >Browser language:</h6> <strong className="text-white">{browserLanguage}</strong>       
        </span>
      </div>
    </footer>
  )
}

export default Footer
