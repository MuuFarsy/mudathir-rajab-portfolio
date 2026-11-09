'use client';

import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  Phone,
  ServerCog,
  ShieldCheck,
  Workflow,
  X,
} from 'lucide-react';
import { filters, personalData, processSteps, projects, services, stats, strengths } from '@/lib/data';
import { cn } from '@/lib/utils';
import { LogoMark } from './logo-mark';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const serviceIcons = [BriefcaseBusiness, Workflow, ServerCog, Palette, ShieldCheck, MonitorSmartphone];

const technologyLogos = [
  { name: 'React', src: '/tech/react.svg' },
  { name: 'Next.js', src: '/tech/nextjs.svg' },
  { name: 'TypeScript', src: '/tech/typescript.svg' },
  { name: 'JavaScript', src: '/tech/javascript.svg' },
  { name: 'PHP', src: '/tech/php.svg' },
  { name: 'Python', src: '/tech/python.svg' },
  { name: 'NestJS', src: '/tech/nestjs.svg' },
  { name: 'Node.js', src: '/tech/nodejs.svg' },
  { name: 'MySQL', src: '/tech/mysql.svg' },
  { name: 'PostgreSQL', src: '/tech/postgresql.svg' },
  { name: 'MongoDB', src: '/tech/mongodb.svg' },
  { name: 'Bootstrap', src: '/tech/bootstrap.svg' },
  { name: 'Tailwind CSS', src: '/tech/tailwindcss.svg' },
  { name: 'Swagger', src: '/tech/swagger.svg' },
  { name: 'Rust', src: '/tech/rust.svg' },
  { name: 'Laravel', src: '/tech/laravel.svg' },
  { name: 'Vue.js', src: '/tech/vuejs.svg' },
];

const codeSnippets = [
  { language: 'TypeScript', code: 'const product = await build(idea);', left: '-2%', top: '10%', width: '23rem', rotate: '-2deg', accent: '#3178c6', delay: '-1.2s', duration: '7.2s', float: '10s', opacity: 0.42 },
  { language: 'Python', code: 'def create_future(): return "impact"', left: '76%', top: '8%', width: '25rem', rotate: '1.5deg', accent: '#3776ab', delay: '-4.4s', duration: '8.2s', float: '11s', opacity: 0.4 },
  { language: 'React', code: 'return <Experience polished responsive />;', left: '36%', top: '4%', width: '25rem', rotate: '0.7deg', accent: '#0ea5e9', delay: '-2.7s', duration: '7.8s', float: '12s', opacity: 0.34 },
  { language: 'Laravel', code: 'Route::get("/ideas", BuildProduct::class);', left: '7%', top: '26%', width: '26rem', rotate: '1.1deg', accent: '#ff2d20', delay: '-5.8s', duration: '8.6s', float: '13s', opacity: 0.38 },
  { language: 'Vue.js', code: 'const launch = computed(() => ready.value);', left: '72%', top: '26%', width: '25rem', rotate: '-1.2deg', accent: '#42b883', delay: '-3.5s', duration: '7.5s', float: '9s', opacity: 0.4 },
  { language: 'JavaScript', code: 'ideas.map((idea) => ship(idea));', left: '51%', top: '19%', width: '23rem', rotate: '-1deg', accent: '#d6b600', delay: '-0.6s', duration: '6.8s', float: '11s', opacity: 0.3 },
  { language: 'PHP', code: '$system->deploy(["secure" => true]);', left: '-4%', top: '44%', width: '24rem', rotate: '-1.5deg', accent: '#777bb4', delay: '-4.9s', duration: '8s', float: '12s', opacity: 0.42 },
  { language: 'Next.js', code: 'export default async function Product() {}', left: '31%', top: '37%', width: '27rem', rotate: '-0.7deg', accent: '#64748b', delay: '-6.2s', duration: '8.8s', float: '10s', opacity: 0.34 },
  { language: 'Rust', code: 'let result = build_safe_and_fast()?;', left: '81%', top: '44%', width: '23rem', rotate: '1.8deg', accent: '#ce422b', delay: '-2s', duration: '7.4s', float: '13s', opacity: 0.4 },
  { language: 'Node.js', code: 'await api.listen(process.env.PORT);', left: '54%', top: '51%', width: '23rem', rotate: '1.2deg', accent: '#5fa04e', delay: '-5.1s', duration: '7.9s', float: '9s', opacity: 0.34 },
  { language: 'NestJS', code: '@Get("insights") findAll() { return data; }', left: '7%', top: '61%', width: '26rem', rotate: '0.8deg', accent: '#e0234e', delay: '-3.1s', duration: '8.5s', float: '11s', opacity: 0.4 },
  { language: 'PostgreSQL', code: 'SELECT value FROM products WHERE live = TRUE;', left: '71%', top: '64%', width: '28rem', rotate: '-1.1deg', accent: '#4169e1', delay: '-6.6s', duration: '9s', float: '12s', opacity: 0.42 },
  { language: 'MySQL', code: 'CREATE INDEX fast_results ON projects(status);', left: '34%', top: '70%', width: '27rem', rotate: '1deg', accent: '#4479a1', delay: '-1.8s', duration: '8.4s', float: '10s', opacity: 0.36 },
  { language: 'MongoDB', code: 'db.products.find({ scalable: true });', left: '-3%', top: '81%', width: '24rem', rotate: '-1deg', accent: '#47a248', delay: '-4.1s', duration: '7.6s', float: '13s', opacity: 0.38 },
  { language: 'Tailwind CSS', code: 'className="grid gap-6 md:grid-cols-2"', left: '77%', top: '83%', width: '27rem', rotate: '1.1deg', accent: '#06b6d4', delay: '-5.5s', duration: '8.1s', float: '9s', opacity: 0.4 },
  { language: 'Bootstrap', code: '<div class="container-fluid responsive">', left: '21%', top: '87%', width: '25rem', rotate: '-0.8deg', accent: '#7952b3', delay: '-2.4s', duration: '7.7s', float: '11s', opacity: 0.34 },
  { language: 'Swagger', code: '@ApiResponse({ status: 200, type: Product })', left: '54%', top: '88%', width: '28rem', rotate: '0.8deg', accent: '#65a30d', delay: '-6.9s', duration: '9.2s', float: '12s', opacity: 0.38 },
];

export function PortfolioPage() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showLanding, setShowLanding] = useState(true);

  const filteredProjects = useMemo(() => {
    const matchingProjects = activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

    return [...matchingProjects].sort(
      (firstProject, secondProject) => Number(Boolean(secondProject.previewImage)) - Number(Boolean(firstProject.previewImage))
    );
  }, [activeFilter]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || showLanding ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, showLanding]);

  useEffect(() => {
    if (!showLanding) return;

    const timer = window.setTimeout(() => {
      setShowLanding(false);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [showLanding]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden">
      <AnimatePresence>
        {showLanding && (
          <motion.section
            className="fixed inset-0 z-[120] flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(99,102,241,0.14),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.12),transparent_20%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative w-full max-w-2xl rounded-[2.25rem] border border-border/70 bg-surface/75 px-6 py-14 text-center shadow-glow backdrop-blur-2xl sm:px-10 sm:py-16"
            >
              <div className="absolute left-1/2 top-10 h-36 w-36 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative flex flex-col items-center">
                <LogoMark className="h-28 w-28 sm:h-32 sm:w-32" />
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  Welcome
                </p>
                <h1 className="mt-4 text-balance text-4xl font-bold tracking-[0.03em] sm:text-5xl">
                  Lets work together
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                  A welcoming screen before entering the full portfolio experience.
                </p>

                <div className="mt-10 w-full max-w-lg">
                  <div className="landing-loader rounded-full" aria-hidden="true">
                    <span className="landing-loader-bar" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <div
        className="pointer-events-none fixed left-0 top-0 z-10 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl transition-transform duration-150 ease-out md:block"
        style={{ transform: `translate(${cursorPosition.x - 80}px, ${cursorPosition.y - 80}px)` }}
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_24%),radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.24),transparent_24%),radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_50%)]" />
      <CodeWritingBackground />

      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-2xl" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-10 w-10 sm:h-12 sm:w-12" />
            <div>
              <div className="text-sm font-semibold tracking-wide sm:text-base">{personalData.name}</div>
              <div className="text-xs text-muted sm:text-sm">{personalData.title}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-muted transition duration-300 hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <a
              href="#contact"
              className="interactive-card inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition duration-300 hover:-translate-y-0.5"
            >
              Let's connect <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="interactive-card inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/85 shadow-soft backdrop-blur"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-dvh w-[min(88vw,24rem)] flex-col border-l border-border/60 bg-surface/95 px-5 py-5 shadow-2xl backdrop-blur-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <LogoMark className="h-10 w-10" />
                  <div>
                    <div className="text-sm font-semibold">{personalData.name}</div>
                    <div className="text-xs text-muted">{personalData.title}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg/70"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-1 flex-col gap-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="interactive-card rounded-2xl border border-border/70 bg-bg/60 px-4 py-4 text-base font-medium text-text"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-3 border-t border-border/60 pt-5">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="interactive-card inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-glow"
                >
                  Let&apos;s connect <ArrowRight className="h-4 w-4" />
                </a>
                <div className="rounded-2xl border border-border/70 bg-bg/50 p-4 text-sm text-muted">
                  Available for websites, systems, APIs, and product UI work.
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main id="top" className="relative z-10 pt-[calc(var(--site-header-height,5rem)+0.5rem)]">
        <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="flex flex-col justify-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted shadow-soft backdrop-blur sm:text-sm">
              <BadgeCheck className="h-4 w-4 text-primary" /> SOFTWARE DEVELOPER
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Building modern digital experiences that look strong and work reliably.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {personalData.intro}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#projects" className="interactive-card inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-glow transition duration-300 hover:-translate-y-0.5 sm:w-auto">View Projects <ArrowRight className="h-4 w-4" /></a>
              <a href="#contact" className="interactive-card inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/85 px-6 py-3.5 font-semibold text-text transition duration-300 hover:-translate-y-0.5 sm:w-auto">Hire Me</a>
              <a href={personalData.cvPath} download className="interactive-card inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface/85 px-6 py-3.5 font-semibold text-text transition duration-300 hover:-translate-y-0.5 sm:w-auto"><Download className="h-4 w-4" /> Download CV</a>
            </motion.div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.06 }}
                  className="interactive-card rounded-3xl border border-border bg-surface/90 p-5 shadow-soft backdrop-blur"
                >
                  <div className="text-2xl font-bold text-text">{item.value}</div>
                  <div className="mt-2 text-sm text-muted">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-3 top-10 hidden rounded-3xl border border-border bg-surface/80 px-4 py-3 shadow-soft backdrop-blur sm:block">
              <div className="text-xs uppercase tracking-[0.18em] text-muted">Responsive</div>
              <div className="mt-1 text-sm font-semibold text-text">Phone to desktop ready</div>
            </motion.div>
            {/* <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-4 right-2 rounded-3xl border border-border bg-surface/80 px-4 py-3 shadow-soft backdrop-blur">
              <div className="text-xs uppercase tracking-[0.18em] text-muted">Available</div>
              <div className="mt-1 text-sm font-semibold text-text">Websites, APIs, systems</div>
            </motion.div> */}
            <div className="absolute -left-6 -top-6 h-36 w-36 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/80 p-4 shadow-glow backdrop-blur sm:p-5">
              <img src={personalData.profileImagePath} alt="Profile placeholder" className="h-auto w-full rounded-[1.5rem] border border-border object-cover" />
              <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-border bg-bg/60 p-5 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Let&apos;s work together</div>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Fast communication, polished UI, and structured development for serious client work.
                  </p>
                </div>
                <div className="grid gap-3">
                  {['Modern visuals', 'Smooth motion', 'Reliable delivery'].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/75 px-4 py-3 text-sm text-text">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">About Me</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A professional developer focused on practical, business-driven solutions.</h2>
            </div>
            <div className="interactive-card rounded-[2rem] border border-border bg-surface/90 p-6 shadow-soft sm:p-8">
              <p className="text-base leading-8 text-muted">{personalData.about}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Professional Strengths</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">What clients can confidently expect from my work.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {strengths.map((strength) => (
              <div key={strength} className="interactive-card rounded-[1.75rem] border border-border bg-surface/90 p-6 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-2xl bg-primary/10 p-3 text-primary"><BadgeCheck className="h-5 w-5" /></div>
                  <p className="text-base font-medium leading-7 text-text">{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Services</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Professional services designed for modern brands and systems.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <div key={service.title} className="interactive-card group rounded-[1.75rem] border border-border bg-surface/90 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-7">
                  <div className="inline-flex rounded-2xl bg-secondary/10 p-3 text-secondary"><Icon className="h-6 w-6" /></div>
                  <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Skills & Tools</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Technology stack and practical strengths used to deliver results.</h2>
          </div>
          <div className="interactive-card rounded-[2rem] border border-border bg-surface/90 py-7 shadow-soft sm:py-9">
            <div className="technology-marquee" aria-label="Technologies and programming languages">
              <div className="technology-marquee-track">
                {[...technologyLogos, ...technologyLogos].map((technology, index) => {
                  const isDuplicate = index >= technologyLogos.length;

                  return (
                    <div
                      key={`${technology.name}-${index}`}
                      className="technology-logo-card"
                      aria-hidden={isDuplicate ? 'true' : undefined}
                    >
                      <Image
                        src={technology.src}
                        alt={isDuplicate ? '' : technology.name}
                        width={52}
                        height={52}
                        className="h-11 w-11 object-contain sm:h-12 sm:w-12"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Projects Portfolio</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A portfolio of systems, platforms, APIs, and digital brand work.</h2>
            </div>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-300',
                    activeFilter === filter
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-surface text-text hover:border-primary/60'
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article key={project.title} className="interactive-card group flex h-full flex-col rounded-[1.85rem] border border-border bg-surface/90 shadow-soft">
                {project.previewImage ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.8rem] border-b border-border bg-bg">
                    <Image
                      src={project.previewImage}
                      alt={project.previewAlt}
                      fill
                      sizes="(min-width: 1280px) 27rem, (min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                      Project preview
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {project.category}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-bg/80 px-3 py-1 text-xs font-medium text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-3 pt-6 text-sm font-medium sm:flex-row sm:items-center sm:gap-4">
                    <a href="#contact" className="inline-flex items-center gap-2 text-primary">Discuss Project <ArrowRight className="h-4 w-4" /></a>
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${project.title} live project`}
                        className="inline-flex items-center gap-2 text-muted transition hover:text-text"
                      >
                        Visit live project <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Work Process</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A clear workflow that keeps projects structured and client-focused.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="interactive-card rounded-[1.75rem] border border-border bg-surface/90 p-6 shadow-soft">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Step {index + 1}</div>
                <p className="mt-4 text-base font-medium leading-7">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[2rem] border border-border bg-surface/90 p-6 shadow-glow sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Branding & Logo</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A custom MR identity built for a clean and memorable developer brand.</h2>
              <p className="mt-5 text-base leading-8 text-muted">
                This SVG logo is designed as a reusable identity mark for your website, documents, project presentations, and digital profiles. You can download it directly and use it anywhere.
              </p>
              <a href="/mr-logo.svg" download className="interactive-card mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-glow transition duration-300 hover:-translate-y-0.5">
                <Download className="h-4 w-4" /> Download SVG
              </a>
            </div>
            <div className="flex items-center justify-center rounded-[1.75rem] border border-border bg-bg/60 p-8 sm:p-10">
              <LogoMark className="h-36 w-36 sm:h-44 sm:w-44" />
            </div>
          </div>
        </section> */}

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Contact</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Let’s talk about your website, system, API, or digital product.</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="interactive-card rounded-[2rem] border border-border bg-surface/90 p-6 shadow-soft sm:p-8">
              <h3 className="text-xl font-semibold">Direct contact</h3>
              <p className="mt-4 text-sm leading-7 text-muted">Reach out for portfolio websites, management systems, API work, or custom product interfaces.</p>
              <div className="mt-8 space-y-5 text-sm">
                <a href={`mailto:${personalData.email}`} className="flex items-center gap-3 text-muted transition hover:text-text"><Mail className="h-5 w-5 text-primary" /> {personalData.email}</a>
                <a href={`tel:${personalData.phone}`} className="flex items-center gap-3 text-muted transition hover:text-text"><Phone className="h-5 w-5 text-primary" /> {personalData.phone}</a>
                <a href={personalData.github} className="flex items-center gap-3 text-muted transition hover:text-text"><Github className="h-5 w-5 text-primary" /> GitHub Profile</a>
                <a href={personalData.linkedin} className="flex items-center gap-3 text-muted transition hover:text-text"><Linkedin className="h-5 w-5 text-primary" /> LinkedIn Profile</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <div>
              <div className="font-semibold text-text">{personalData.name}</div>
              <div>{personalData.title}</div>
            </div>
          </div>
          <p className="max-w-2xl">Copyright © 2026 Mudathir Rajab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function CodeWritingBackground() {
  return (
    <div className="hero-code-background" aria-hidden="true">
      <div className="hero-code-ambient hero-code-ambient-one" />
      <div className="hero-code-ambient hero-code-ambient-two" />
      {codeSnippets.map((snippet, index) => (
        <div
          key={snippet.language}
          className="hero-code-snippet"
          style={{
            '--snippet-left': snippet.left,
            '--snippet-top': snippet.top,
            '--snippet-width': snippet.width,
            '--snippet-rotate': snippet.rotate,
            '--snippet-accent': snippet.accent,
            '--snippet-opacity': snippet.opacity,
            '--code-width': `${snippet.code.length}ch`,
            '--code-delay': snippet.delay,
            '--code-duration': snippet.duration,
            '--float-duration': snippet.float,
            '--float-delay': snippet.delay,
          } as CSSProperties}
        >
          <div className="hero-code-toolbar">
            <span />
            <span />
            <span />
            <span className="hero-code-language">{snippet.language}</span>
          </div>
          <div className="hero-code-row">
            <span className="hero-code-index">{String(index + 1).padStart(2, '0')}</span>
            <code className="hero-code-line">{snippet.code}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    setStatus('loading');
    setFeedback('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong while sending the message.');
      }

      setStatus('success');
      setFeedback('Your message was sent successfully. I will get back to you soon.');
      setForm({ fullName: '', email: '', phone: '', company: '', budget: '', subject: '', message: '' });
      feedbackTimeoutRef.current = setTimeout(() => {
        setStatus('idle');
        setFeedback('');
        feedbackTimeoutRef.current = null;
      }, 2500);
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message right now.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="interactive-card rounded-[2rem] border border-border bg-surface/90 p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Full Name" name="fullName" value={form.fullName} onChange={onChange} placeholder="Your full name" required />
        <FormField label="Email Address" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
        <FormField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+255 700 000 000" />
        <FormField label="Company or Brand" name="company" value={form.company} onChange={onChange} placeholder="Your company or brand" />
        <div className="md:col-span-2">
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-text">Budget Range</label>
          <select id="budget" name="budget" value={form.budget} onChange={onChange} className="w-full rounded-2xl border border-border bg-bg/80 px-4 py-3 text-sm outline-none transition focus:border-primary" required>
            <option value="">Select budget range</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1,500">$500 - $1,500</option>
            <option value="$1,500 - $5,000">$1,500 - $5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
        </div>
      </div>
      <div className="mt-5 grid gap-5">
        <FormField label="Subject" name="subject" value={form.subject} onChange={onChange} placeholder="Project subject" required />
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">Message</label>
          <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} placeholder="Tell me about your project, goals, timeline, and what you need built." required className="w-full rounded-2xl border border-border bg-bg/80 px-4 py-3 text-sm outline-none transition focus:border-primary" />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === 'loading'} className="interactive-card inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-glow transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
        <div
          className={cn(
            'text-sm',
            status === 'success' && 'text-green-600 dark:text-green-400',
            status === 'error' && 'text-red-600 dark:text-red-400',
            status === 'loading' && 'text-muted'
          )}
        >
          {feedback}
        </div>
      </div>
    </form>
  );
}

function FormField({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={props.name} className="mb-2 block text-sm font-medium text-text">{label}</label>
      <input {...props} id={props.name} className="w-full rounded-2xl border border-border bg-bg/80 px-4 py-3 text-sm outline-none transition focus:border-primary" />
    </div>
  );
}
