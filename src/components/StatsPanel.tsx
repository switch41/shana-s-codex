import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const stats = [
  { name: "Python", attr: "PY", value: 92 },
  { name: "React / TypeScript", attr: "TS", value: 93 },
  { name: "AI / ML", attr: "AI", value: 86 },
  { name: "Node / API", attr: "ND", value: 85 },
  { name: "UI / UX", attr: "UX", value: 90 },
  { name: "DevOps", attr: "DO", value: 76 },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

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
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-6 space-y-5"
            >
              {stats.map((s, i) => (
                <StatBar key={s.name} stat={s} index={i} />
              ))}
            </motion.div>
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

function StatBar({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between font-display text-xs tracking-wider">
        <span className="text-foreground">
          <span className="font-bold text-[var(--primary)]">{stat.attr}</span>
          <span className="ml-3 text-muted-foreground/70">{stat.name}</span>
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{stat.value}/100</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-black/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${stat.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, oklch(0.58 0.08 45), oklch(0.58 0.08 45 / 0.3))",
            boxShadow: "0 0 6px oklch(0.58 0.08 45 / 0.3)",
          }}
        />
      </div>
    </div>
  );
}
