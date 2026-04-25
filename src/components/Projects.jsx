import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Bot, LineChart, Video, Info } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import telegramIcon from '../assets/telegram.svg';

const projects = [
  {
    title: "Personal Chatbot",
    icon: <Bot size={28} className="text-sky-400" />,
    description: "A personal AI assistant chatbot that answers questions about myself and general queries, integrating web search, multimodal input, and real-time streaming responses.",
    tech: ["React.js", "Tailwind", "DaisyUI", "OpenRouter", "n8n"],
    joke: "Built during a phase where I had a lot more free time than usual (just broke up with my gf).",
    links: [
      {
        type: "demo",
        url: "https://chatbot.athaahsan.com/",
        label: "Live Demo",
        primary: true
      }
    ],
    gradient: "from-sky-500/20 to-blue-500/20"
  },
  {
    title: "Crypto Dashboard",
    icon: <LineChart size={28} className="text-purple-400" />,
    description: "A real-time cryptocurrency dashboard with an AI Insight module that analyzes technical indicators and market sentiment to generate a structured daily market bias.",
    tech: ["Streamlit", "Python", "Google Apps Script", "OpenRouter", "Telegram API"],
    links: [
      {
        type: "demo",
        url: "https://atha-crypto-dashboard.streamlit.app/",
        label: "Live Demo",
        primary: true
      },
      {
        type: "telegram",
        url: "https://t.me/dailybtcinsightbot",
        label: "Telegram Bot",
        primary: false
      }
    ],
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Video Clipping Automation",
    icon: <Video size={28} className="text-emerald-400" />,
    description: "An automated video clipping pipeline using n8n to retrieve Twitch content, process clips into short-form videos with FFmpeg, and generate synchronized subtitles with ElevenLabs API.",
    tech: ["n8n", "FFmpeg", "Twitch API", "ElevenLabs API"],
    joke: "Built after repeatedly seeing “auto clipping” ads, I decided to try and build my own instead.",
    links: [
      {
        type: "youtube",
        url: "https://www.youtube.com/@JiddyClips-67",
        label: "JiddyClips",
        primary: true
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/@MoodaClips-67",
        label: "MoodaClips",
        primary: true
      }
    ],
    gradient: "from-emerald-500/20 to-teal-500/20"
  }
];

const Projects = () => {
  const [activeJokeIndex, setActiveJokeIndex] = useState(null);

  const toggleJoke = (index) => {
    setActiveJokeIndex(activeJokeIndex === index ? null : index);
  };

  const getButtonStyle = (link) => {
    const baseStyle = "group flex w-full sm:flex-1 md:w-full md:flex-none lg:flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm md:text-base border";

    if (link.primary) {
      if (link.type === 'youtube') {
        return `${baseStyle} bg-red-600 hover:bg-red-500 border-red-600 hover:border-red-500 text-white shadow-lg shadow-red-600/25`;
      }
      return `${baseStyle} bg-sky-500 hover:bg-sky-400 border-sky-500 hover:border-sky-400 text-white shadow-lg shadow-sky-500/25`;
    } else {
      if (link.type === 'telegram') {
        return `${baseStyle} bg-slate-800/50 border-slate-700 hover:bg-[#229ED9]/10 hover:border-[#229ED9]/50 text-slate-300 hover:text-[#229ED9]`;
      }
      if (link.type === 'youtube') {
        return `${baseStyle} bg-slate-800/50 border-slate-700 hover:bg-red-500/10 hover:border-red-500/50 text-slate-300 hover:text-red-400`;
      }
      return `${baseStyle} bg-slate-800/50 hover:bg-slate-700 border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white`;
    }
  };

  const getIcon = (link) => {
    if (link.type === 'telegram') {
      return <img src={telegramIcon} alt="Telegram" className={`w-[18px] h-[18px] transition-opacity ${link.primary ? '' : 'opacity-70 group-hover:opacity-100'}`} />;
    } else if (link.type === 'youtube') {
      return <FaYoutube size={18} />;
    } else {
      return <ExternalLink size={18} />;
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full border border-slate-700/50 hover:border-slate-500/50 transition-colors"
            >
              <div className={`h-24 bg-gradient-to-br ${project.gradient} pl-8 py-5 flex items-end relative overflow-hidden`}>
                <div className="absolute -top-10 -right-10 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                  {project.icon}
                </div>
                <div className="bg-slate-900/80 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  {project.icon}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  {project.joke && (
                    <button
                      onClick={() => toggleJoke(index)}
                      className={`p-1.5 rounded-full transition-all focus:outline-none ${activeJokeIndex === index ? 'bg-purple-500/20 text-purple-400 rotate-12' : 'bg-slate-800 text-slate-400 hover:text-purple-400 hover:bg-slate-700'}`}
                      title="More info"
                    >
                      <Info size={16} />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {project.joke && activeJokeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-4"
                    >
                      <div className="pb-1">
                        <p className="text-sm text-purple-300/90 bg-purple-500/10 px-4 py-3 rounded-xl border border-purple-500/20 italic shadow-inner">
                          {project.joke}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-slate-300 leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-full border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3 pt-6 border-t border-slate-700/50">
                  {project.links && project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={getButtonStyle(link)}
                      title={link.label}
                    >
                      {getIcon(link)}
                      <span className="truncate">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
