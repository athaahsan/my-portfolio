import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certificates = [
  {
    title: "Meta Data Analyst Specialization",
    issuer: "Meta (Coursera)",
    date: "Issued: May 2025",
    credentialLink: "https://www.coursera.org/account/accomplishments/specialization/CALPDJULKXHK",
    skills: "Data Analytics, Python, Data Visualization, Spreadsheets, SQL, Pandas, Machine Learning."
  },
  {
    title: "English Proficiency Test (TOEFL ITP-style)",
    issuer: "Telkom University Language Center",
    date: "Issued: Mar 2025",
    credentialLink: "https://drive.google.com/file/d/100f56XAofjWIWJXh1CjdsLZ2C__oem9T/view?usp=sharing",
    skills: "Score: 590/677 (CEFR B2)"
  },
  {
    title: "Meta Front-End Developer Specialization",
    issuer: "Meta (Coursera)",
    date: "Issued: Apr 2024",
    credentialLink: "https://www.coursera.org/account/accomplishments/specialization/QT8SKSWXSVBM",
    skills: "HTML, CSS, JavaScript, React.js, Bootstrap, Git, Figma, UI/UX."
  }
];

const Certificates = () => {
  return (
    <section id="certificates" className="py-20 relative bg-slate-900/50">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Certificates</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-card p-6 rounded-3xl border border-slate-700 hover:border-pink-500/50 transition-all group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-pink-500/10 text-pink-400 rounded-2xl group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <Award size={24} />
                </div>
                <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                  {cert.date.split(':')[1].trim()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{cert.title}</h3>
              <p className="text-pink-400 font-medium mb-4 text-sm">{cert.issuer}</p>
              
              <p className="text-slate-400 text-sm mb-6 flex-1">
                {cert.skills}
              </p>

              <a 
                href={cert.credentialLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-pink-500 text-slate-300 hover:text-white rounded-xl transition-all text-sm font-medium mt-auto"
              >
                <ExternalLink size={16} />
                View Credential
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
