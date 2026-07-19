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
                className="group whitespace-nowrap font-medium text-[#FF4F1F] underline decoration-[#FF4F1F]/50 decoration-dashed underline-offset-[6px] transition-all duration-300 hover:text-[#ff6a43] hover:decoration-[#FF4F1F] hover:decoration-solid"
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
              className="horizontal-edge-fade flex items-stretch overflow-x-auto pb-8 -mx-4 px-4 md:-mx-8 md:px-8 hide-scrollbar gap-4 md:gap-6"
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
                  className="accent-card accent-card-n8n glass-card group relative flex w-[85vw] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 transition-all hover:border-[#FF4F1F]/40 sm:w-[320px] md:w-[350px] lg:w-[380px]"
                >
                  <div className="flex-1 relative z-10">
                    <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white">
                      {workflow.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {workflow.categories && workflow.categories.map((category, idx) => (
                        <span 
                          key={idx} 
                          className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-700/50 pt-4 text-slate-400 transition-colors group-hover:text-[#FF4F1F]">
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
