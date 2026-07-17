import { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';

const N8nWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch('/.netlify/functions/getN8nWorkflows');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setWorkflows(data);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflows();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || workflows.length === 0) return;

    let animationFrameId;
    let lastTimestamp = performance.now();
    let scrollAmount = 0;

    const scroll = (timestamp) => {
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused && scrollRef.current) {
        const speed = 0.05; // pixels per ms
        scrollAmount += speed * deltaTime;

        if (scrollAmount >= 1) {
          const shift = Math.floor(scrollAmount);
          scrollRef.current.scrollLeft += shift;
          scrollAmount -= shift;
          
          // Get the exact width of one set of workflows
          const firstItem = itemRefs.current[0];
          const nextSetFirstItem = itemRefs.current[workflows.length];
          
          if (firstItem && nextSetFirstItem) {
            const distance = nextSetFirstItem.getBoundingClientRect().left - firstItem.getBoundingClientRect().left;
            
            // Loop back smoothly when we've scrolled past exactly one full set
            if (scrollRef.current.scrollLeft >= distance) {
              scrollRef.current.scrollLeft -= distance;
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, workflows.length]);

  return (
    <section id="n8n-creator" className="portfolio-section">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Copywriting section */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="portfolio-section-heading"
        >
          <div className="mb-4 text-center">
            <h2 className="text-4xl font-bold text-white">
              Verified n8n Creator{' '}
              <span
                aria-label="Verified n8n creator"
                title="Verified n8n creator"
                className="relative -top-0.5 ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ff4f1f] align-middle text-[#160b12] shadow-[0_0_0_3px_rgba(255,79,31,0.08)]"
              >
                <Check size={13} strokeWidth={3.5} />
              </span>
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-orange-500 mx-auto rounded-full mb-8"></div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              I use n8n to connect APIs, automate repetitive work, and build AI-powered workflows. You can find my published automations on my{' '}
              <a 
                href="https://n8n.io/creators/athaahsan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group text-rose-300 hover:text-rose-400 font-medium underline underline-offset-[6px] decoration-rose-500/50 decoration-dashed hover:decoration-rose-400 hover:decoration-solid transition-all duration-300 whitespace-nowrap"
              >
                n8n Creator Profile
                <ExternalLink size={14} className="inline-block ml-1.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative -top-0.5" />
              </a>.
            </p>
          </div>
        </Motion.div>

        {/* Workflows list */}
        <div className="relative w-full">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-slate-700 border-t-rose-500 rounded-full animate-spin"></div>
            </div>
          ) : workflows.length > 0 ? (
            <div 
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex items-stretch overflow-x-auto pb-8 -mx-4 px-4 md:-mx-8 md:px-8 hide-scrollbar gap-4 md:gap-6"
            >
              {[...workflows, ...workflows, ...workflows].map((workflow, index) => (
                <Motion.div
                  key={`${workflow.id}-${index}`}
                  ref={(el) => (itemRefs.current[index] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % workflows.length) * 0.1 }}
                  onClick={() => window.open(workflow.url, '_blank')}
                  className="shrink-0 w-[85vw] sm:w-[320px] md:w-[350px] lg:w-[380px] glass-card rounded-2xl border border-slate-700/50 hover:border-rose-500/40 p-6 flex flex-col bg-slate-800/40 cursor-pointer group transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[40px] group-hover:bg-rose-500/10 transition-colors duration-500"></div>
                  
                  <div className="flex-1 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors line-clamp-2">
                      {workflow.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {workflow.categories && workflow.categories.map((category, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-slate-900/80 text-rose-300/90 text-xs font-small rounded-full border border-rose-500/20"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-slate-400 group-hover:text-rose-400 transition-colors relative z-10">
                    <span className="text-sm font-medium">View Workflow</span>
                    <ExternalLink size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </Motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              No workflows available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default N8nWorkflows;
