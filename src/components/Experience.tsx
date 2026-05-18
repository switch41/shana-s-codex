import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const levels = [
  {
    year: "2025",
    title: "Artificial Intelligence Engineer",
    org: "JagrIQ · Deephash Technologies",
    desc: "Designing conversational AI systems and intelligent assistant workflows for production SaaS environments.",
    impact: [
      "Prompt engineering & evaluation",
      "Intent routing systems",
      "Failure analysis & response optimisation",
    ],
    tags: ["Conversational AI", "Prompt Engineering", "SaaS", "Python"],
  },
  {
    year: "2025",
    title: "Artificial Intelligence Engineer",
    org: "VISWAM.AI",
    desc: "Engineering domain-focused language model workflows using curated datasets and scalable preprocessing systems for fine-tuning pipelines.",
    impact: [
      "Dataset optimisation & validation",
      "LLM training workflow design",
      "Reproducible AI pipeline systems",
    ],
    tags: ["LLM Fine-tuning", "Dataset Curation", "AI Pipelines", "NLP"],
  },
  {
    year: "2024 — 2025",
    title: "Visual Designer",
    org: "IETE ISF VBIT",
    desc: "Crafting digital visuals, event creatives, and branding assets for technical communities and student-led initiatives.",
    impact: [
      "Event identity systems",
      "Social & promotional creatives",
      "Design-led storytelling",
    ],
    tags: ["Brand Design", "Visual Identity", "Social Media", "Figma"],
  },
  {
    year: "2024",
    title: "Data Specialist",
    org: "Alteryx SparkED",
    desc: "Designing end-to-end analytics workflows focused on transforming fragmented raw data into structured, analysis-ready pipelines.",
    impact: [
      "Data preparation & automation",
      "Workflow optimisation",
      "Multi-source data processing",
    ],
    tags: ["Data Analytics", "ETL", "Workflow Automation", "Alteryx"],
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export function Experience() {
  return (
    <section id="experience" className="relative px-8 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          kicker="History"
          title="The path taken"
          subtitle="From fine-tuning LLMs to designing brand identities — every role shaped how I approach AI products. Here is the map."
        />

        <div className="relative mt-20">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/30 to-transparent md:left-1/2" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-20"
          >
            {levels.map((l, i) => (
              <motion.div
                key={l.title}
                variants={item}
                className={`relative pl-16 md:grid md:grid-cols-2 md:gap-14 md:pl-0 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className="absolute left-3 top-2 z-10 flex h-2.5 w-2.5 items-center justify-center md:left-1/2">
                  <div className="h-full w-full rounded-full bg-[var(--primary)]/40" />
                  <div className="absolute h-5 w-5 animate-breathe rounded-full border border-[var(--primary)]/15" />
                </div>

                <div className={i % 2 === 0 ? "md:pr-14 md:text-right" : "md:pl-14"}>
                  <div className="font-mono text-[10px] tracking-widest text-[var(--primary)]/60 uppercase">
                    {l.year}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
                    {l.title}
                  </h3>
                  <div className="mt-0.5 font-serif text-sm italic text-[var(--primary)]/70">
                    {l.org}
                  </div>
                  <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
                    {l.desc}
                  </p>
                  <div
                    className={`mt-4 flex flex-col gap-1.5 ${i % 2 === 0 ? "md:items-end" : ""}`}
                  >
                    {l.impact.map((imp) => (
                      <span
                        key={imp}
                        className="inline-flex items-center gap-2 font-mono text-[9px] tracking-wider text-muted-foreground/50"
                      >
                        <span className="h-px w-3 bg-[var(--primary)]/20" />
                        {imp}
                      </span>
                    ))}
                  </div>

                  {"tags" in l && l.tags && (
                    <div
                      className={`mt-4 flex flex-wrap gap-1.5 ${i % 2 === 0 ? "md:justify-end" : ""}`}
                    >
                      {l.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/5 px-2.5 py-0.5 font-mono text-[8px] tracking-wider text-[var(--primary)]/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
