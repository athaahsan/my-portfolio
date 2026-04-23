import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, Info } from 'lucide-react';

const Education = () => {
  const [showJoke, setShowJoke] = useState(false);

  return (
    <section id="education" className="py-20 relative bg-slate-900/50">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10 rounded-3xl border border-purple-500/20 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Telkom University</h3>
                  <p className="text-lg text-purple-400 font-medium mb-2">Bachelor of Informatics</p>
                  <div className="flex flex-col gap-2">
                    <div className="text-slate-400 flex items-center flex-wrap gap-2">
                      <Award size={16} />
                      GPA: 3.9/4.0 - <span className="text-white italic">Cum Laude</span>
                      <button 
                        onClick={() => setShowJoke(!showJoke)}
                        className={`ml-1 p-1 rounded-full transition-all focus:outline-none ${showJoke ? 'bg-purple-500/20 text-purple-400 rotate-12' : 'bg-slate-800 text-slate-400 hover:text-purple-400 hover:bg-slate-700'}`}
                        title="The truth hurts..."
                      >
                        <Info size={14} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {showJoke && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-1 pb-2">
                            <p className="text-sm text-purple-300/90 bg-purple-500/10 px-4 py-3 rounded-xl border border-purple-500/20 italic shadow-inner max-w-sm">
                              Missed summa cum laude by 0.01, close enough to hurt, far enough to stay humble.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 font-medium whitespace-nowrap mt-2 md:mt-0">
                Aug 2021 – Aug 2025
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700/50 relative z-10">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                Thesis / Research
              </h4>
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                <a 
                  href="https://ieeexplore.ieee.org/document/11279051" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4"
                >
                  <p className="text-slate-300 group-hover:text-purple-300 transition-colors italic leading-relaxed">
                    "Pipeline Hybridization of Autoencoder and Singular Value Decomposition for Multi-Criteria Recommender System"
                  </p>
                  <span className="p-2 bg-purple-500/20 text-purple-400 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-all shrink-0">
                    <ExternalLink size={18} />
                  </span>
                </a>
                <p className="text-sm text-slate-400 mt-4">
                  Presented virtually at ICSECS 2025 (IEEE 9th International Conference on Software Engineering & Computer Systems), hosted in Pekan, Pahang, Malaysia.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
