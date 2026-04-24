import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    role: "Business Development Officer – Data Scientist Function",
    company: "PT Beon Intermedia",
    date: "Jan 2026 – Present",
    type: "Contract",
    highlights: [
      "Designed and maintained n8n-based automation workflows for SaaS products and internal operations.",
      "Integrated LLM capabilities into automation workflows, performing prompt engineering and AI-driven logic.",
      "Configured OpenClaw to enable agentic AI assistance across internal teams, supporting task execution and decision-making processes."
    ]
  },
  {
    role: "Front-End Web Developer",
    company: "PT ARM Solusi",
    date: "Jun 2024 – Aug 2024",
    type: "Internship",
    highlights: [
      "Developed a web-based provisioning form for PT ARM Solusi’s COOFIS system.",
      "Focused on frontend development using React.js and Material UI.",
      "Collaborated with the team using Git for version control and teamwork."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 sm:pl-48 py-6 group"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 sm:left-40 top-0 bottom-0 w-px bg-slate-800 group-hover:bg-sky-500/50 transition-colors"></div>
              
              {/* Timeline Dot */}
              <div className="absolute left-[-6px] sm:left-[155px] top-8 w-3 h-3 rounded-full bg-slate-800 border-2 border-sky-500 group-hover:bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)] transition-all"></div>

              {/* Date (Desktop) */}
              <div className="hidden sm:block absolute left-0 top-6 w-36 text-right">
                <span className="text-sm font-medium text-sky-400">{exp.date}</span>
              </div>

              <div className="glass-card p-6 md:p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {exp.company}
                      </span>
                      <span className="px-2 py-1 bg-slate-800 rounded-md text-xs border border-slate-700">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Date (Mobile) */}
                  <div className="sm:hidden flex items-center gap-2 text-sky-400 text-sm font-medium">
                    <Calendar size={16} />
                    {exp.date}
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"></span>
                      <span className="leading-relaxed text-sm md:text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
