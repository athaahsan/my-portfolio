import { useEffect, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const certificates = [
  {
    title: 'Meta Data Analyst Specialization',
    issuer: 'Meta (Coursera)',
    date: 'Issued: May 2025',
    credentialLink: 'https://www.coursera.org/account/accomplishments/specialization/CALPDJULKXHK',
    skills: 'Data Analytics, Python, Data Visualization, Spreadsheets, SQL, Pandas, Machine Learning.',
  },
  {
    title: 'English Proficiency Test (TOEFL ITP-style)',
    issuer: 'Telkom University Language Center',
    date: 'Issued: Mar 2025',
    credentialLink: 'https://drive.google.com/file/d/100f56XAofjWIWJXh1CjdsLZ2C__oem9T/view?usp=sharing',
    skills: 'Score: 590/677 (CEFR B2)',
  },
  {
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta (Coursera)',
    date: 'Issued: Apr 2024',
    credentialLink: 'https://www.coursera.org/account/accomplishments/specialization/QT8SKSWXSVBM',
    skills: 'HTML, CSS, JavaScript, React.js, Bootstrap, Git, Figma, UI/UX.',
  },
];

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const lastIndex = Math.max(0, certificates.length - visibleCount);
  const visibleRange = visibleCount === 1
    ? String(currentIndex + 1).padStart(2, '0')
    : `${String(currentIndex + 1).padStart(2, '0')}–${String(Math.min(currentIndex + visibleCount, certificates.length)).padStart(2, '0')}`;

  useEffect(() => {
    const tabletQuery = window.matchMedia('(min-width: 768px)');
    const wideQuery = window.matchMedia('(min-width: 1280px)');
    const updateVisibleCount = () => {
      const nextVisibleCount = wideQuery.matches ? 3 : tabletQuery.matches ? 2 : 1;
      setVisibleCount(nextVisibleCount);
      setCurrentIndex((index) => Math.min(index, certificates.length - nextVisibleCount));
    };

    updateVisibleCount();
    tabletQuery.addEventListener('change', updateVisibleCount);
    wideQuery.addEventListener('change', updateVisibleCount);
    return () => {
      tabletQuery.removeEventListener('change', updateVisibleCount);
      wideQuery.removeEventListener('change', updateVisibleCount);
    };
  }, []);

  const scrollToCertificate = (index) => {
    const nextIndex = Math.max(0, Math.min(index, lastIndex));
    const carousel = carouselRef.current;
    const targetCard = cardRefs.current[nextIndex];
    if (!carousel || !targetCard) return;

    carousel.scrollTo({ left: targetCard.offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
    setCurrentIndex(nextIndex);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    const firstCard = cardRefs.current[0];
    const secondCard = cardRefs.current[1];
    if (!carousel || !firstCard || !secondCard) return;

    const cardStep = secondCard.offsetLeft - firstCard.offsetLeft;
    if (!cardStep) return;
    setCurrentIndex(Math.min(lastIndex, Math.max(0, Math.round(carousel.scrollLeft / cardStep))));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollToCertificate(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollToCertificate(currentIndex + 1);
    }
  };

  return (
    <section id="certificates" className="relative bg-slate-900/50 py-20">
      <div className="mx-auto w-full max-w-7xl px-8 md:px-16 lg:px-24">
        <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">Certificates</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-pink-500" />
        </Motion.div>

        {visibleCount < certificates.length && (
          <div className="mx-auto mb-5 flex max-w-6xl items-center justify-between" aria-live="polite">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              {visibleRange}<span className="mx-2 text-slate-700">/</span>{String(certificates.length).padStart(2, '0')}
            </p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => scrollToCertificate(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Show previous certificate" className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 transition hover:border-pink-400/50 hover:text-pink-300 disabled:cursor-not-allowed disabled:opacity-30">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => scrollToCertificate(currentIndex + 1)} disabled={currentIndex === lastIndex} aria-label="Show next certificate" className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 transition hover:border-pink-400/50 hover:text-pink-300 disabled:cursor-not-allowed disabled:opacity-30">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        <div ref={carouselRef} onScroll={handleScroll} onKeyDown={handleKeyDown} tabIndex={0} role="region" aria-label="Certificates carousel" className="hide-scrollbar mx-auto flex max-w-6xl snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overflow-y-hidden rounded-3xl pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/50">
          {certificates.map((certificate, index) => (
            <Motion.article
              key={certificate.title}
              ref={(element) => { cardRefs.current[index] = element; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="glass-card group flex w-full shrink-0 snap-start flex-col rounded-3xl border border-slate-700 p-6 transition-all hover:border-pink-500/50 md:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-3rem)/3)]"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="rounded-2xl bg-pink-500/10 p-3 text-pink-400 transition-colors group-hover:bg-pink-500 group-hover:text-white">
                  <Award size={24} />
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">{certificate.date.split(':')[1].trim()}</span>
              </div>

              <h3 className="mb-2 text-xl font-bold leading-tight text-white">{certificate.title}</h3>
              <p className="mb-4 text-sm font-medium text-pink-400">{certificate.issuer}</p>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{certificate.skills}</p>

              <a href={certificate.credentialLink} target="_blank" rel="noopener noreferrer" className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-pink-500 hover:text-white">
                <ExternalLink size={16} /> View Credential
              </a>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
