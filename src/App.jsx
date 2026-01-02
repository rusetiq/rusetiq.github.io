import { useState, useEffect } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import GitHub from './components/GitHub'
import Footer from './components/Footer'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      const target = e.target
      const isInteractive = target.closest('a, button, .btn, .project-card, .project-link, [role="button"]')
      setIsHovering(!!isInteractive)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="noise-overlay" />
      <div className="scanlines-overlay" />
      <div className="vhs-effect" />
      <div className="crt-vignette" />
      <div className="corner-glow corner-glow-tl" />
      <div className="corner-glow corner-glow-br" />

      <div
        className={`cursor-trail ${isHovering ? 'hovering' : ''}`}
        style={{
          left: mousePos.x - (isHovering ? 25 : 10),
          top: mousePos.y - (isHovering ? 25 : 10),
          opacity: showSplash ? 0 : 1
        }}
      />

      <main style={{ visibility: showSplash ? 'hidden' : 'visible' }}>
        <Hero />
        <Projects />
        <About />
        <GitHub />
        <Footer />
      </main>
    </>
  )
}

export default App

