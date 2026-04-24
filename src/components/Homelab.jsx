import { motion } from 'framer-motion';
import { Rocket, Wrench, Terminal } from 'lucide-react';
import n8nLogo from '../assets/n8n.svg';
import openclawLogo from '../assets/openclaw-dark.svg';
import dockerLogo from '../assets/docker.svg';
import nextcloudLogo from '../assets/nextcloud.svg';
import tailscaleLogo from '../assets/tailscale-light.svg';

const tools = [
  { name: "n8n", description: "Workflow Automation", icon: <img src={n8nLogo} alt="n8n" className="w-5 h-5 object-contain" /> },
  { name: "OpenClaw", description: "Agentic AI Tools", icon: <img src={openclawLogo} alt="OpenClaw" className="w-5 h-5 object-contain" /> },
  { name: "Docker", description: "Containerization", icon: <img src={dockerLogo} alt="Docker" className="w-5 h-5 object-contain" /> },
  { name: "Nextcloud", description: "Local Cloud Storage", icon: <img src={nextcloudLogo} alt="Nextcloud" className="w-5 h-5 object-contain" /> },
  { name: "Tailscale", description: "Secure Network", icon: <img src={tailscaleLogo} alt="Tailscale" className="w-5 h-5 object-contain" /> },
  { name: "SSH", description: "Remote Access", icon: <Terminal size={20} className="text-slate-400" /> },
];

const Homelab = () => {
  return (
    <section id="homelab" className="py-20 relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Homelab & Playground</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center lg:justify-start gap-3">
              <Wrench className="text-sky-400" />
              The Sandbox
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              My homelab is a dedicated mini PC sandbox for exploring self-hosted infrastructure and backend services.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I use it to build and test <span className="text-rose-400 font-semibold">n8n</span> and <span className="text-purple-400 font-semibold">OpenClaw</span> workflows, run <span className="text-sky-400 font-semibold">Nextcloud</span> for storage, and connect remotely via <span className="text-emerald-400 font-semibold">SSH</span> and <span className="text-emerald-400 font-semibold">Tailscale</span>.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed flex items-start sm:items-center justify-center lg:justify-start gap-2">
              <Rocket className="text-emerald-400 shrink-0 mt-1 sm:mt-0" size={20} />
              <span>I'm always ready to explore and adopt new, game-changing technologies here.</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-700/50 bg-slate-800/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] group-hover:bg-sky-500/20 transition-colors duration-700"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors duration-700"></div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
                {tools.map((tool, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-3 md:p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-sky-500/30 transition-all shadow-lg flex flex-col items-center sm:items-start text-center sm:text-left gap-2 md:gap-3 backdrop-blur-md"
                  >
                    <div className="p-2 md:p-2.5 bg-slate-900 rounded-xl shadow-inner border border-slate-700/50">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="text-white text-sm md:text-base font-bold leading-tight">{tool.name}</h4>
                      <p className="text-slate-400 text-xs mt-1 leading-snug">{tool.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Homelab;
