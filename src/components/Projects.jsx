import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Info } from 'lucide-react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import telegramIcon from '../assets/telegram.svg';

const projects = [
  {
    title: 'Personal Chatbot',
    category: 'Conversational AI',
    description: 'A personal AI assistant chatbot that answers questions about myself and general queries, using RAG for personal knowledge retrieval, Tavily-powered web search, multimodal input, and real-time streaming responses.',
    tech: ['React.js', 'Tailwind CSS', 'DaisyUI', 'OpenRouter', 'Supabase', 'Tavily', 'Netlify'],
    joke: 'Built during a phase where I had a lot more free time than usual (unemployment after graduation lol).',
    previewUrl: 'https://chatbot.athaahsan.com/',
    links: [
      { type: 'demo', url: 'https://chatbot.athaahsan.com/', label: 'Live Demo', primary: true },
    ],
    gradient: 'from-sky-500/20 to-blue-500/20',
  },
  {
    title: 'Video Automation',
    category: 'Content Automation',
    description: 'An automated Twitch-to-YouTube Shorts pipeline that deduplicates clips, processes videos with FFmpeg, generates Groq STT subtitles, and publishes finished content to YouTube.',
    tech: ['n8n', 'FFmpeg', 'Twitch API', 'Groq STT', 'Supabase', 'YouTube API'],
    joke: 'Built after repeatedly seeing “auto clipping” ads, so I decided to try building my own.',
    previewMode: 'youtube',
    previewUrl: 'https://www.youtube.com/embed/2nIPPVU4EPQ?playsinline=1&rel=0',
    links: [
      { type: 'youtube', url: 'https://www.youtube.com/@JiddyClips-67', label: 'JiddyClips', primary: true },
      { type: 'case-study', url: 'https://github.com/athaahsan/twitch-clips-to-youtube-shorts', label: 'Case Study', primary: false },
    ],
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Crypto Dashboard',
    category: 'Market Intelligence',
    description: 'A real-time cryptocurrency dashboard with an AI Insight module that analyzes technical indicators and market sentiment to generate a structured daily market bias.',
    tech: ['React.js', 'Tailwind CSS', 'DaisyUI', 'Google Apps Script', 'OpenRouter', 'Netlify'],
    joke: 'It started as a Streamlit project, but I rebuilt it in React after getting tired of the auto-sleep behavior.',
    previewUrl: 'https://crypto.athaahsan.com/',
    links: [
      { type: 'demo', url: 'https://crypto.athaahsan.com/', label: 'Live Demo', primary: true },
      { type: 'telegram', url: 'https://t.me/dailybtcinsightbot', label: 'Telegram Bot', primary: false },
    ],
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
];

const TechPill = ({ technology }) => (
  <span className="shrink-0 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
    {technology}
  </span>
);

const TechStack = ({ technologies }) => (
  <>
    <div className="tech-stack-marquee-window -mx-1 mb-5 overflow-hidden px-1 md:hidden" aria-label="Technology stack">
      <div className="tech-stack-marquee-track flex w-max">
        <div className="flex gap-2 pr-2">
          {technologies.map((technology) => <TechPill key={technology} technology={technology} />)}
        </div>
        <div className="flex gap-2 pr-2" aria-hidden="true">
          {technologies.map((technology) => <TechPill key={`duplicate-${technology}`} technology={technology} />)}
        </div>
      </div>
    </div>

    <div className="mb-5 hidden flex-wrap gap-2 md:flex" aria-label="Technology stack">
      {technologies.map((technology) => <TechPill key={technology} technology={technology} />)}
    </div>
  </>
);

const ProjectPreview = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  if (project.previewMode === 'youtube') {
    return (
      <div className="relative h-44 overflow-hidden bg-black md:h-full md:min-h-[400px]">
        <iframe
          src={project.previewUrl}
          title={`${project.title} video preview`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  const liveDemoUrl = project.links.find((link) => link.type === 'demo')?.url;

  return (
    <a
      href={liveDemoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title} live demo`}
      title={`Open ${project.title} live demo`}
      className={`group/preview relative block h-44 cursor-pointer overflow-hidden bg-gradient-to-br outline-none transition-shadow hover:shadow-[inset_0_0_0_2px_rgba(56,189,248,.45)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 md:h-full md:min-h-[400px] ${project.gradient}`}
    >
      <div className={`absolute inset-0 z-10 grid place-items-center bg-slate-900/80 transition-opacity duration-500 ${loaded ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" /> Loading live preview
        </div>
      </div>
      <iframe
        src={project.previewUrl}
        title={`${project.title} live preview`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        tabIndex="-1"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[280%] w-[280%] origin-top-left scale-[0.357143] border-0 bg-slate-950 opacity-95 transition-opacity group-hover/preview:opacity-100 md:h-[160%] md:w-[160%] md:scale-[0.625]"
      />
    </a>
  );
};

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [descriptionCanExpand, setDescriptionCanExpand] = useState(false);
  const [showJoke, setShowJoke] = useState(false);
  const [descriptionElement, setDescriptionElement] = useState(null);
  const project = projects[currentIndex];

  useEffect(() => {
    const description = descriptionElement;
    if (!description) return undefined;

    const measureOverflow = () => {
      if (!description.classList.contains('line-clamp-3')) return;
      setDescriptionCanExpand(description.scrollHeight > description.clientHeight + 1);
    };

    const animationFrame = requestAnimationFrame(measureOverflow);
    const resizeObserver = new ResizeObserver(measureOverflow);
    resizeObserver.observe(description);
    window.addEventListener('resize', measureOverflow);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureOverflow);
    };
  }, [descriptionElement]);

  const moveToProject = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= projects.length || nextIndex === currentIndex) return;
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentIndex(nextIndex);
    setExpandedDescription(false);
    setDescriptionCanExpand(false);
    setShowJoke(false);
  };

  const getButtonStyle = (link) => {
    const baseStyle = 'group flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:px-4 md:text-base';
    if (link.primary && link.type === 'youtube') return `${baseStyle} border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500`;
    if (link.primary) return `${baseStyle} border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400`;
    if (link.type === 'telegram') return `${baseStyle} border-slate-700 bg-slate-800/50 text-slate-300 hover:border-[#229ED9]/50 hover:text-[#229ED9]`;
    if (link.type === 'case-study') return `${baseStyle} border-slate-700 bg-slate-800/50 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300`;
    return `${baseStyle} border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:text-white`;
  };

  const getIcon = (link) => {
    if (link.type === 'telegram') return <img src={telegramIcon} alt="Telegram" className="h-[18px] w-[18px] opacity-70 transition-opacity group-hover:opacity-100" />;
    if (link.type === 'youtube') return <FaYoutube size={18} />;
    if (link.type === 'case-study') return <FaGithub size={18} />;
    return <ExternalLink size={18} />;
  };

  return (
    <section id="projects" className="relative py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-16 lg:px-24">
        <Motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center md:mb-12">
          <h2 className="mb-4 text-4xl font-bold text-white">Featured Projects</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-purple-500" />
        </Motion.div>

        <div className="mx-auto mb-4 flex max-w-6xl items-center justify-between">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-500" aria-live="polite">
            {String(currentIndex + 1).padStart(2, '0')}<span className="mx-2 text-slate-700">/</span>{String(projects.length).padStart(2, '0')}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => moveToProject(currentIndex - 1)} disabled={currentIndex === 0} aria-label="Show previous project" className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 transition hover:border-sky-400/40 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => moveToProject(currentIndex + 1)} disabled={currentIndex === projects.length - 1} aria-label="Show next project" className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 transition hover:border-sky-400/40 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div role="region" aria-label="Featured projects carousel" className="mx-auto max-w-6xl overflow-hidden rounded-3xl focus:outline-none">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <Motion.article
              key={project.title}
              custom={direction}
              variants={{
                enter: (slideDirection) => ({ opacity: 0, x: slideDirection * 28 }),
                center: { opacity: 1, x: 0 },
                exit: (slideDirection) => ({ opacity: 0, x: slideDirection * -28 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="glass-card grid overflow-hidden rounded-3xl border border-slate-700/50 md:grid-cols-[minmax(250px,.72fr)_minmax(0,1.28fr)] lg:grid-cols-[minmax(300px,.85fr)_minmax(0,1.15fr)] xl:grid-cols-[1fr_1fr]"
            >
              <ProjectPreview project={project} />

              <div className="flex min-w-0 flex-col p-5 sm:p-7 md:p-8">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{project.category}</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
                      <button type="button" onClick={() => setShowJoke((value) => !value)} aria-label={`More about ${project.title}`} aria-expanded={showJoke} className={`shrink-0 rounded-full p-1.5 transition-all ${showJoke ? 'rotate-12 bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-purple-400'}`}>
                        <Info size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {showJoke && (
                    <Motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 overflow-hidden rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm italic text-purple-300/90">
                      {project.joke}
                    </Motion.p>
                  )}
                </AnimatePresence>

                <div className="mb-4">
                  <p ref={setDescriptionElement} className={`text-sm leading-relaxed text-slate-300 sm:text-base ${expandedDescription ? '' : 'line-clamp-3 md:line-clamp-none'}`}>{project.description}</p>
                  {descriptionCanExpand && (
                    <button type="button" onClick={() => setExpandedDescription((value) => !value)} className="mt-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 md:hidden" aria-expanded={expandedDescription}>
                      {expandedDescription ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                <TechStack key={project.title} technologies={project.tech} />

                <div className="mt-auto flex items-center gap-2 border-t border-slate-700/50 pt-5 sm:gap-3">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className={getButtonStyle(link)} title={link.label}>
                      {getIcon(link)}<span className="truncate">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Motion.article>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-5 flex max-w-6xl justify-center gap-2" aria-label="Choose project">
          {projects.map((item, index) => (
            <button key={item.title} type="button" onClick={() => moveToProject(index)} aria-label={`Show ${item.title}`} aria-current={currentIndex === index ? 'true' : undefined} className={`h-1.5 rounded-full transition-all ${currentIndex === index ? 'w-8 bg-sky-400' : 'w-2 bg-slate-700 hover:bg-slate-500'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
