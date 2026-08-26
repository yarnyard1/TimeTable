import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 shadow-sm">
      <NavLink className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
        <i className="bi bi-clock-history"></i>
        TimePlanner Pro
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`}>
        <ul className="navbar-nav ms-auto gap-md-2">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' active fw-semibold' : ''}`
              }
              to="/"
              end
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' active fw-semibold' : ''}`
              }
              to="/tasks"
              onClick={closeMenu}
            >
              Tasks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' active fw-semibold' : ''}`
              }
              to="/about"
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
