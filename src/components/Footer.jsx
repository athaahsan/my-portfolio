import { Mail } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-900/80 py-8">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-800/70 pb-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white">
              Atha<span className="text-sky-400">.</span>
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Building intelligent automated systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/athaahsan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:border-sky-400/50 hover:text-sky-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/athaahsan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:border-sky-400/50 hover:text-sky-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:atha.ahsan.xavier.haris@gmail.com"
              aria-label="Email"
              title="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:border-sky-400/50 hover:text-sky-300"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-center text-xs text-slate-600 md:flex-row md:items-center md:justify-between md:text-left">
          <p>&copy; {currentYear} Atha Ahsan Xavier Haris.</p>
          <p>React + Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
