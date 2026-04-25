import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Chat', href: '#chatbot' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      {/* Background layer to avoid backdrop-filter nesting bug */}
      <div className={`absolute inset-0 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}></div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-white hover:text-sky-400 transition-colors">
            <Code2 className="w-8 h-8 text-sky-400" />
            <span>Atha<span className="text-sky-400">.</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1VJhL5kHJY8bVxoUfMLlK6E-aJ1vW0-hR/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-semibold py-2 px-5 rounded-full shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 border border-sky-400/20"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-800/90 backdrop-blur-lg border border-white/10 mt-4 rounded-2xl p-4 flex flex-col gap-4 absolute left-4 right-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-200 font-medium hover:text-sky-400 p-2"
              >
                {link.name}
              </a>
            ))}
            <div className="h-px w-full bg-slate-700/50 my-1"></div>
            <a
              href="https://drive.google.com/file/d/1VJhL5kHJY8bVxoUfMLlK6E-aJ1vW0-hR/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-center bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-sky-500/20 transition-all border border-sky-400/20"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
