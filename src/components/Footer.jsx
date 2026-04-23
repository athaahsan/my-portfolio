import { Mail } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Atha Ahsan<span className="text-sky-400">.</span></h3>
            <p className="text-slate-400 max-w-sm">
              Building intelligent and automated systems. Bringing data and AI to the front-end.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/athaahsan" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-sky-500 hover:text-white rounded-full transition-all text-slate-300">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/athaahsan" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-sky-500 hover:text-white rounded-full transition-all text-slate-300">
              <Linkedin size={20} />
            </a>
            <a href="mailto:atha.ahsan.xavier.haris@gmail.com" className="p-3 bg-slate-800 hover:bg-sky-500 hover:text-white rounded-full transition-all text-slate-300">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Atha Ahsan Xavier Haris. Built with React & Tailwind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
