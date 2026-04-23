import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ChevronDown, Terminal, ArrowRight, Sparkles } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import profilePic from '../assets/athaPic6.jpeg';
import openclawLogo from '../assets/openclaw-dark.svg';
import reactLogo from '../assets/reactjs.svg';
import tailwindLogo from '../assets/tailwind.svg';
import pythonLogo from '../assets/python.svg';
import n8nLogo from '../assets/n8n.svg';
import openrouterLogo from '../assets/open-router-dark.svg';

const Hero = () => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden bg-gradient-mesh">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-sky-400 text-sm font-semibold mb-8 backdrop-blur-md shadow-inner">
              <Terminal size={16} />
              <span>Interdisciplinary Developer</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Hi, I'm <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500">
                Atha Ahsan<br />Xavier Haris
              </span>
            </h1>

            <div className="mb-8 max-w-2xl mx-auto md:mx-0">
              <p className="text-lg md:text-xl text-slate-300 font-medium mb-4 leading-relaxed">
                Building intelligent and automated systems.
              </p>

              
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-6 justify-center md:justify-start mt-10">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-sky-500 rounded-full overflow-hidden transition-all hover:bg-sky-400 hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.3)] focus:outline-none w-full sm:w-auto whitespace-nowrap flex-shrink-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <div className="flex items-center gap-4 text-slate-400">
                <a href="https://linkedin.com/in/athaahsan" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] border border-slate-700/50 hover:border-[#0A66C2]/50 rounded-full transition-all hover:scale-110 shadow-lg" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/athaahsan" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 hover:bg-white/10 hover:text-white border border-slate-700/50 hover:border-white/50 rounded-full transition-all hover:scale-110 shadow-lg" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="mailto:atha.ahsan.xavier.haris@gmail.com" className="p-3 bg-slate-800/50 hover:bg-rose-500/10 hover:text-rose-400 border border-slate-700/50 hover:border-rose-500/50 rounded-full transition-all hover:scale-110 shadow-lg" aria-label="Email">
                  <Mail size={20} />
                </a>
                <a href="tel:+6281329031605" className="p-3 bg-slate-800/50 hover:bg-emerald-500/10 hover:text-emerald-400 border border-slate-700/50 hover:border-emerald-500/50 rounded-full transition-all hover:scale-110 shadow-lg" aria-label="Phone">
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 hidden md:flex justify-center items-center"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
              <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-purple-600 p-1.5 shadow-[0_0_40px_rgba(14,165,233,0.3)] z-10 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-purple-600 blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-[6px] border-slate-900">
                  <img src={profilePic} alt="Atha Ahsan" className="w-full h-full object-cover transition-transform duration-700" />
                </div>
              </div>

              {/* Floating Elements Orbit */}
              {/* React - Top Left */}
              <div className="absolute top-[10%] -left-6 md:-left-8 -translate-y-1/2 z-20">
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="glass-card p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(14,165,233,0.2)] border border-sky-500/30 bg-slate-900/90 backdrop-blur-md flex items-center justify-center"
                  title="React"
                >
                  <img src={reactLogo} alt="React" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </motion.div>
              </div>

              {/* Tailwind - Top Right */}
              <div className="absolute top-[10%] -right-6 md:-right-8 -translate-y-1/2 z-20">
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="glass-card p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(20,184,166,0.2)] border border-teal-500/30 bg-slate-900/90 backdrop-blur-md flex items-center justify-center"
                  title="Tailwind CSS"
                >
                  <img src={tailwindLogo} alt="Tailwind CSS" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </motion.div>
              </div>

              {/* Python - Bottom Left */}
              <div className="absolute bottom-[10%] -left-6 md:-left-8 translate-y-1/2 z-20">
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  className="glass-card p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(234,179,8,0.2)] border border-yellow-500/30 bg-slate-900/90 backdrop-blur-md flex items-center justify-center"
                  title="Python"
                >
                  <img src={pythonLogo} alt="Python" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </motion.div>
              </div>

              {/* n8n - Bottom Right */}
              <div className="absolute bottom-[10%] -right-6 md:-right-8 translate-y-1/2 z-20">
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
                  className="glass-card p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(244,63,94,0.2)] border border-rose-500/30 bg-slate-900/90 backdrop-blur-md flex items-center justify-center"
                  title="n8n"
                >
                  <img src={n8nLogo} alt="n8n" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </motion.div>
              </div>

              {/* OpenClaw - Top Center */}
              <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 2 }}
                  className="glass-card p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.2)] border border-purple-500/30 bg-slate-900/90 backdrop-blur-md flex items-center justify-center"
                  title="OpenClaw"
                >
                  <img src={openclawLogo} alt="OpenClaw" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </motion.div>
              </div>

              {/* OpenRouter - Bottom Center */}
              <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1.2 }}
                  className="glass-card p-2 md:p-3 rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-blue-500/30 bg-slate-900/90 backdrop-blur-md flex items-center justify-center"
                  title="OpenRouter"
                >
                  <img src={openrouterLogo} alt="OpenRouter" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
