import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Homelab from './components/Homelab'
import Certificates from './components/Certificates'
import Skills from './components/Skills'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans selection:bg-sky-500/30">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Homelab />
        <Education />
        <Certificates />
        <Skills />
      </main>
      <Footer />
    </div>
  )
}

export default App
