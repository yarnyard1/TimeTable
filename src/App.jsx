import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import NotFound from './pages/NotFound.jsx'

const About = lazy(() => import('./pages/About.jsx'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route
            path="about"
            element={
              <Suspense
                fallback={
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 text-muted">Loading About page…</p>
                  </div>
                }
              >
                <About />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
