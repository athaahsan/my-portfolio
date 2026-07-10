import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import AgenticPlayground from './components/AgenticPlayground'
import Homelab from './components/Homelab'
import N8nWorkflows from './components/N8nWorkflows'
import Certificates from './components/Certificates'
import Skills from './components/Skills'
import ChatbotSection from './components/ChatbotSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="portfolio-backdrop min-h-screen bg-slate-900 font-geist selection:bg-sky-500/30">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <N8nWorkflows />
        <Projects />
        <AgenticPlayground />
        {/* <Homelab /> */}
        <Education />
        <Certificates />
        <Experience />
        <Skills />
        <ChatbotSection />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
