import { motion as Motion } from 'framer-motion';
import { Code2, ExternalLink, LockKeyhole, Terminal, Wrench } from 'lucide-react';
import n8nLogo from '../assets/n8n.svg';
import openclawLogo from '../assets/openclaw-dark.svg';

const tools = [
  { name: 'n8n', description: 'Self-hosted automation', icon: <img src={n8nLogo} alt="n8n" className="w-5 h-5 object-contain" /> },
  { name: 'OpenClaw', description: 'Agentic AI sandbox', icon: <img src={openclawLogo} alt="OpenClaw" className="w-5 h-5 object-contain" /> },
  { name: 'Private Access', description: 'Domain + auth protected', icon: <LockKeyhole size={20} className="text-emerald-400" /> },
  { name: 'Agentic Coding', description: 'Codex-assisted development', icon: <Code2 size={20} className="text-sky-400" /> },
];

const AgenticPlayground = () => {
  return (
    <section id="agentic-playground" className="portfolio-section">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="portfolio-section-heading"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Self-Hosted Stack</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-sky-500 mx-auto rounded-full"></div>
        </Motion.div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center lg:justify-start gap-3">
              <Wrench className="text-rose-400" />
              The Sandbox
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I keep a small private setup for testing automation ideas in a real environment, with <span className="text-rose-400 font-semibold">self-hosted n8n</span> and <span className="text-purple-400 font-semibold">OpenClaw</span> running behind my own domain with authentication.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              n8n is where I test workflows, API orchestration, and LLM integrations. OpenClaw is my sandbox for testing how agents use tools and work with code.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              A related experiment:{' '}
              <a
                href="https://github.com/athaahsan/crypto-agent-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-emerald-300 hover:text-emerald-200 font-medium underline underline-offset-[6px] decoration-emerald-500/50 decoration-dashed hover:decoration-solid transition-all"
              >
                Crypto Agent Tools
                <ExternalLink size={15} className="inline-block ml-1.5 relative -top-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              , a CLI that gives AI agents structured access to crypto market data and analysis.
            </p>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-700/50 bg-slate-800/40">
              <div className="grid grid-cols-2 gap-3 relative z-10">
                {tools.map((tool) => (
                  <Motion.div
                    key={tool.name}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="p-3 md:p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-rose-500/30 transition-all shadow-lg flex flex-col items-center sm:items-start text-center sm:text-left gap-2 md:gap-3 backdrop-blur-md"
                  >
                    <div className="p-2 md:p-2.5 bg-slate-900 rounded-xl shadow-inner border border-slate-700/50">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="text-white text-sm md:text-base font-bold leading-tight">{tool.name}</h4>
                      <p className="text-slate-400 text-xs mt-1 leading-snug">{tool.description}</p>
                    </div>
                  </Motion.div>
                ))}
              </div>

            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgenticPlayground;
