import { motion } from 'framer-motion';

const skills = [
  "React.js", "JavaScript", "Tailwind CSS", "HTML", "CSS",
  "Python", "Data Analytics", "Data Visualization", "Machine Learning", 
  "LLM Integration", "Prompt Engineering", "OpenClaw",
  "n8n", "Google Apps Script", "Git"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-5"
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="px-6 py-4 glass-card border border-slate-700/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-200 hover:text-emerald-400 text-sm md:text-base font-medium rounded-2xl transition-all shadow-lg cursor-default flex items-center justify-center"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
