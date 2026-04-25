import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, Info, Calendar, ChevronDown } from 'lucide-react';

const Education = () => {
  const [showJoke, setShowJoke] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

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

            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="p-3 md:p-4 bg-purple-500/20 rounded-2xl text-purple-400 shrink-0">
                  <GraduationCap className="w-8 h-8" />
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
              <div className="flex items-center gap-2 text-slate-400 font-medium whitespace-nowrap mt-2 md:mt-0">
                <Calendar size={18} className="text-purple-400/70" />
                <span>Aug 2021 – Aug 2025</span>
              </div>
            </div>

            <div className="mt-8 pt-8 relative z-10">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-slate-700/80 via-slate-700/40 to-transparent"></div>
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
                  <span className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 font-semibold rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-all shrink-0 text-sm">
                    <ExternalLink size={16} /> IEEE Xplore
                  </span>
                </a>

                <div className="mt-5 pt-4 flex flex-col relative">

                  <button
                    onClick={() => setShowCertificate(!showCertificate)}
                    className="group self-start flex items-center gap-2 py-1 text-sm font-medium text-slate-400 hover:text-purple-300 transition-colors focus:outline-none"
                  >
                    <span className="relative">
                      {showCertificate ? "Hide Details" : "View Details"}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-400/60 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${showCertificate ? "rotate-180 text-purple-400" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {showCertificate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-4">
                          <p className="text-sm text-slate-400 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 leading-relaxed">
                            Presented virtually at <span className="text-slate-300 font-medium">ICSECS 2025</span> (IEEE 9th International Conference on Software Engineering & Computer Systems), hosted in Pekan, Pahang, Malaysia.
                          </p>
                          <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-lg shadow-purple-500/10 bg-slate-900/50 p-2">
                            <img
                              src="https://raw.githubusercontent.com/athaahsan/personal-chatbot/refs/heads/main/src/assets/icsecs25-certificate_page-0001.jpg"
                              alt="ICSECS 2025 Presenter Certificate"
                              className="w-full h-auto rounded-lg object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
