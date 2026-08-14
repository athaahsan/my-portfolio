import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'AI Chat', href: '#chatbot' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    let animationFrameId = null;

    const updateNavbar = () => {
      animationFrameId = null;
      setIsScrolled(window.scrollY > 20);

      const viewportMarker = window.innerHeight * 0.45;
      const activeLink = navLinks.find((link) => {
        const section = document.querySelector(link.href);
        if (!section) return false;

        const bounds = section.getBoundingClientRect();
        return bounds.top <= viewportMarker && bounds.bottom >= viewportMarker;
      });

      setActiveSection(activeLink?.href.slice(1) ?? null);
    };

    const handleViewportChange = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateNavbar);
      }
    };

    updateNavbar();
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      {/* Background layer to avoid backdrop-filter nesting bug */}
      <div className={`absolute inset-0 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md shadow-[0_12px_32px_rgba(2,6,23,0.22)]' : 'bg-transparent shadow-none'}`}></div>

      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-white hover:text-sky-400 transition-colors">
            <span>Atha<span className="text-sky-400">.</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors ${activeSection === link.href.slice(1) ? 'text-white' : 'text-slate-300 hover:text-white'}`}
              >
                {link.name}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-sky-400 transition-all duration-300 ${activeSection === link.href.slice(1) ? 'w-5 opacity-100' : 'w-0 opacity-0'}`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-800/90 backdrop-blur-lg border border-white/10 mt-4 rounded-2xl p-4 flex flex-col gap-4 absolute left-4 right-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                className={`flex items-center justify-between p-2 font-medium transition-colors ${activeSection === link.href.slice(1) ? 'text-sky-400' : 'text-slate-200 hover:text-sky-400'}`}
              >
                {link.name}
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full bg-sky-400 transition-opacity ${activeSection === link.href.slice(1) ? 'opacity-100' : 'opacity-0'}`}
                />
              </a>
            ))}
          </Motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
