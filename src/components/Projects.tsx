import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Layers, Eye, Zap, Globe } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { SpotlightCard } from "./SpotlightCard";

const projects = [
  {
    name: "Bhasha AI Lab",
    type: "AIML Platform",
    desc: "Fine-tune any LLM on your own data without writing a single pipeline. Connect your LLM, import datasets from Kaggle, CSV, or URL — the platform handles training, evaluation, and comparison end to end.",
    icon: Terminal,
    tags: ["LLM Fine-Tuning", "TypeScript", "React", "Python", "HuggingFace"],
    category: "aiml",
  },
  {
    name: "Redact",
    type: "NLP Tool",
    desc: "PII detection and redaction engine for unstructured documents and scanned PDFs. spaCy NER + Tesseract OCR pipeline. ~80% extraction accuracy across 200+ test samples.",
    icon: Eye,
    tags: ["NLP", "Python", "spaCy", "OCR", "Flask"],
    category: "aiml",
  },
  {
    name: "Smart Consent Manager",
    type: "Privacy Tool",
    desc: "Sandboxed privacy scanner built on Firecrawl headless extraction. Detects hidden trackers and fingerprinting scripts without loading the target site. Scores every site — Safe, Caution, or Risky.",
    icon: Globe,
    tags: ["TypeScript", "React", "Node.js", "Firecrawl"],
    category: "sde",
  },
  {
    name: "Switch Healthcare",
    type: "Full-Stack",
    desc: "Full-stack AI medical assistant with symptom analysis and patient records. JWT auth, role-based access for patients and providers. ~25% API response time improvement via query optimisation and caching.",
    icon: Zap,
    tags: ["TypeScript", "FastAPI", "React", "JWT"],
    category: "sde",
  },
  {
    name: "Gesture Kiosk System",
    type: "CV Application",
    desc: "Touchless interaction system powered by computer vision and gesture recognition for accessibility-focused kiosk experiences.",
    icon: Layers,
    tags: ["Python", "OpenCV", "MediaPipe", "ML"],
    category: "aiml",
  },
];

const filterTabs = [
  { key: "all", label: "All" },
  { key: "sde", label: "SDE" },
  { key: "aiml", label: "AI/ML" },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative px-8 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          kicker="Work"
          title="Selected projects"
          subtitle="A mix of SDE infrastructure and AIML pipelines — each one shipped to production and used by real people."
        />

        <div className="mt-12 flex items-center justify-center gap-1 rounded-full border border-[var(--primary)]/10 bg-black/20 p-1 w-fit mx-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`relative rounded-full px-5 py-2 font-display text-[11px] tracking-wide transition-colors duration-200 ${
                activeFilter === tab.key
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeFilter === tab.key && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-[var(--primary)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpotlightCard className="h-full rounded-[2rem]">
                    <div className="glass-panel flex h-full flex-col rounded-[2rem] p-7 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--primary)]/15 bg-[var(--primary)]/8">
                          <Icon className="h-5 w-5 text-[var(--primary)]" />
                        </div>
                        <span className="rounded-full border border-[var(--primary)]/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                          {p.type}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-foreground">
                        {p.name}
                      </h3>
                      <p className="mt-3 flex-1 font-serif text-sm leading-relaxed text-muted-foreground">
                        {p.desc}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[var(--primary)]/8 bg-[var(--primary)]/5 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-[var(--primary)]/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 h-px divider-gradient" />
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
