import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ChevronDown, Terminal, ArrowRight, Sparkles } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import profilePic from '../assets/athaPic7.jpeg';
import reactLogo from '../assets/reactjs.svg';
import tailwindLogo from '../assets/tailwind.svg';
import pythonLogo from '../assets/python.svg';
import n8nLogo from '../assets/n8n.svg';
import openrouterLogo from '../assets/open-router-dark.svg';

const Hero = () => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-x-hidden bg-gradient-mesh">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >


            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tighter">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-400 tracking-normal block mb-2">👋 Hi, I'm</span>
              <span className="inline-block text-sky-100">
                Atha Ahsan
              </span><br />
              <span className="inline-block text-sky-100">
                Xavier Haris
              </span>
            </h1>

            <div className="mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-4 leading-relaxed ai-shimmer inline-block">
                Building intelligent automated systems...
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-6 justify-center md:justify-start mt-6 md:mt-8">
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
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center items-center w-full"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mt-6 md:mt-0 mb-6">
              <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-purple-600 p-[3px] shadow-[0_0_40px_rgba(14,165,233,0.3)] z-10 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-purple-600 blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-[6px] border-slate-900">
                  <img src={profilePic} alt="Atha Ahsan" className="w-full h-full object-cover transition-transform duration-700" />
                </div>
              </div>
            </div>



          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
