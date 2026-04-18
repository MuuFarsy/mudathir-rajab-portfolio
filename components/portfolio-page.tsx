'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
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
import { filters, personalData, processSteps, projects, services, skills, stats, strengths } from '@/lib/data';
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

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-hero-grid bg-hero-grid" />
      <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-12 w-12" />
            <div>
              <div className="text-base font-semibold tracking-wide">{personalData.name}</div>
              <div className="text-sm text-muted">{personalData.title}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-muted transition hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
            >
              Hire Me <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border/60 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-muted">
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white">
                Hire Me
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-16 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div className="flex flex-col justify-center">
            {/* <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-sm text-muted shadow-soft backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-primary" /> 
            </motion.span> */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Building modern digital experiences that look strong and work reliably.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {personalData.intro}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-glow transition hover:-translate-y-0.5">View Projects <ArrowRight className="h-4 w-4" /></a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-semibold text-text transition hover:-translate-y-0.5">Hire Me</a>
              <a href={personalData.cvPath} download className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-semibold text-text transition hover:-translate-y-0.5"><Download className="h-4 w-4" /> Download CV</a>
              {/* <a href="/mr-logo.svg" download className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-semibold text-text transition hover:-translate-y-0.5"><Download className="h-4 w-4" /> Download Logo</a> */}
            </motion.div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.06 }}
                  className="rounded-3xl border border-border bg-surface/90 p-5 shadow-soft backdrop-blur"
                >
                  <div className="text-2xl font-bold text-text">{item.value}</div>
                  <div className="mt-2 text-sm text-muted">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -left-6 -top-6 h-36 w-36 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/80 p-5 shadow-glow backdrop-blur">
              <img src={personalData.profileImagePath} alt="Profile placeholder" className="h-auto w-full rounded-[1.5rem] border border-border object-cover" />
              <div className="mt-5 rounded-[1.5rem] border border-border bg-bg/60 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Let's work together</div>
                {/* <p className="mt-3 text-sm leading-7 text-muted">
                  Replace this placeholder image with your real professional portrait inside the public folder. The layout is already prepared for a strong personal brand presentation.
                </p> */}
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
            <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-soft">
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
              <div key={strength} className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-soft">
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
                <div key={service.title} className="group rounded-[1.75rem] border border-border bg-surface p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
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
          <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-soft">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-text">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Projects Portfolio</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A portfolio of systems, platforms, APIs, and digital brand work.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition',
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
              <div key={project.title} className="rounded-[1.85rem] border border-border bg-surface p-7 shadow-soft">
                <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {project.category}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm font-medium">
                  <a href="#contact" className="inline-flex items-center gap-2 text-primary">Discuss Project <ArrowRight className="h-4 w-4" /></a>
                  <a href="#" className="inline-flex items-center gap-2 text-muted">Demo Link <ExternalLink className="h-4 w-4" /></a>
                </div>
              </div>
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
              <div key={step} className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-soft">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Step {index + 1}</div>
                <p className="mt-4 text-base font-medium leading-7">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[2rem] border border-border bg-surface p-8 shadow-glow lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Branding & Logo</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A custom MR identity built for a clean and memorable developer brand.</h2>
              <p className="mt-5 text-base leading-8 text-muted">
                This SVG logo is designed as a reusable identity mark for your website, documents, project presentations, and digital profiles. You can download it directly and use it anywhere.
              </p>
              <a href="/mr-logo.svg" download className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-glow transition hover:-translate-y-0.5">
                <Download className="h-4 w-4" /> Download SVG
              </a>
            </div>
            <div className="flex items-center justify-center rounded-[1.75rem] border border-border bg-bg/60 p-10">
              <LogoMark className="h-44 w-44" />
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Contact</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Let’s talk about your website, system, API, or digital product.</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-soft">
              <h3 className="text-xl font-semibold">Direct contact placeholders</h3>
              <p className="mt-4 text-sm leading-7 text-muted">Replace these placeholders with your real contact details, links, and downloadable documents.</p>
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
          <p>Built as a professional portfolio starter project with light mode, dark mode, animation, SVG branding, and a real contact API.</p>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    budget: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      setForm({ fullName: '', email: '', company: '', budget: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message right now.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-border bg-surface p-8 shadow-soft">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Full Name" name="fullName" value={form.fullName} onChange={onChange} placeholder="Your full name" required />
        <FormField label="Email Address" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
        <FormField label="Company or Brand" name="company" value={form.company} onChange={onChange} placeholder="Your company or brand" />
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-text">Budget Range</label>
          <select id="budget" name="budget" value={form.budget} onChange={onChange} className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm outline-none transition focus:border-primary" required>
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
          <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} placeholder="Tell me about your project, goals, timeline, and what you need built." required className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm outline-none transition focus:border-primary" />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === 'loading'} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
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
      <input {...props} id={props.name} className="w-full rounded-2xl border border-border bg-bg px-4 py-3 text-sm outline-none transition focus:border-primary" />
    </div>
  );
}
