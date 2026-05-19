import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const competencies = [
  { code: "PY", label: "Python" },
  { code: "TS", label: "React / TypeScript" },
  { code: "AI", label: "AI / ML · NLP · LLMs" },
  { code: "ND", label: "Node / FastAPI / Flask" },
  { code: "DO", label: "Docker / Git" },
  { code: "ML", label: "PyTorch / HuggingFace" },
];

export function StatsPanel() {
  return (
    <section id="about" className="relative px-8 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          kicker="About"
          title="Two tracks, one builder"
          subtitle="Software engineering and machine learning aren't separate worlds — they're two sides of the same craft. He works at the intersection."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-[2rem] p-8 md:p-10"
          >
            <div className="font-mono text-[10px] tracking-widest text-[var(--primary)]/60 uppercase">
              The short version
            </div>
            <p className="mt-5 font-serif text-base leading-relaxed text-muted-foreground">
              Kushal is a developer from Hyderabad, better known online as switch41. He builds at
              the intersection of AI and full-stack, turning messy ideas into working prototypes —
              from healthcare chatbots to production AI tools.
            </p>
            <p className="mt-4 font-serif text-base leading-relaxed text-muted-foreground">
              He builds across both tracks, shipping software and models alike. The throughline: he
              builds things that work, whether it's a React frontend or a PyTorch pipeline. If it's
              technically weird and hasn't been done yet, that's exactly where he wants to be.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Meta label="Based in" value="Hyderabad" />
              <Meta label="Tracks" value="SDE + AIML" />
              <Meta label="Stack" value="React · PyTorch · Edge" />
              <Meta label="Status" value="Open to work" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-[2rem] p-8 md:p-10"
          >
            <div className="font-mono text-[10px] tracking-widest text-[var(--primary)]/60 uppercase">
              Competencies
            </div>
            <div className="mt-6 grid gap-3">
              {competencies.map((c, i) => (
                <CompetencyCard key={c.code} competency={c} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--primary)]/10 bg-[var(--primary)]/5 px-4 py-3">
      <div className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-1 font-display text-sm text-foreground">{value}</div>
    </div>
  );
}

function CompetencyCard({
  competency,
  index,
}: {
  competency: (typeof competencies)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
        delay: index * 0.1,
      }}
      className="flex items-center gap-4 rounded-xl border border-[var(--primary)]/10 bg-[var(--primary)]/5 px-4 py-3"
    >
      <span className="font-mono text-[10px] font-bold tracking-wider text-[var(--primary)]/40">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="font-mono text-[11px] font-bold tracking-widest text-[var(--primary)]">
        {competency.code}
      </span>
      <span className="font-serif text-xs italic text-muted-foreground">
        {competency.label}
      </span>
    </motion.div>
  );
}
