import { motion } from "framer-motion";

const stats = [
  { name: "Python", attr: "ATK", value: 92, color: "var(--neon-crimson)" },
  { name: "React / TS", attr: "SPD", value: 95, color: "var(--neon-purple)" },
  { name: "AI / ML", attr: "INT", value: 88, color: "var(--neon-blue)" },
  { name: "Node / API", attr: "DEF", value: 85, color: "var(--neon-purple)" },
  { name: "UI / UX", attr: "CHR", value: 90, color: "var(--neon-crimson)" },
  { name: "DevOps", attr: "END", value: 78, color: "var(--neon-blue)" },
];

export function StatsPanel() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="// CHARACTER PROFILE" title="About the Hunter" />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hud-panel p-8"
          >
            <div className="font-pixel text-[10px] tracking-widest text-[var(--neon-purple)]">
              ▸ BIO.LOG
            </div>
            <h3 className="mt-3 font-display text-3xl text-glow-purple">Class: Full-Stack Sorcerer</h3>
            <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
              By day a builder of interfaces, by night a hunter of bugs. I wield TypeScript like
              a revolver, conjure pixel-perfect UIs, and bind language models with arcane prompts.
              Five years deep in the void, still leveling up.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 font-pixel text-[10px]">
              <Meta label="LEVEL" value="27" />
              <Meta label="GUILD" value="INDIE" />
              <Meta label="REGION" value="EARTH" />
              <Meta label="WEAPON" value="KEYBOARD" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hud-panel p-8"
          >
            <div className="font-pixel text-[10px] tracking-widest text-[var(--neon-crimson)]">
              ▸ STAT.SHEET
            </div>
            <div className="mt-6 space-y-5">
              {stats.map((s, i) => (
                <StatBar key={s.name} stat={s} index={i} />
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
    <div className="border border-[var(--neon-purple)]/30 bg-[var(--neon-purple)]/5 px-3 py-2">
      <div className="text-[8px] tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-[10px] text-foreground">{value}</div>
    </div>
  );
}

function StatBar({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between font-pixel text-[10px]">
        <span className="text-foreground">
          <span style={{ color: stat.color, textShadow: `0 0 8px ${stat.color}` }}>{stat.attr}</span>
          <span className="ml-3 text-muted-foreground">{stat.name}</span>
        </span>
        <span style={{ color: stat.color }}>{stat.value}</span>
      </div>
      <div className="relative h-2 overflow-hidden border border-[var(--neon-purple)]/30 bg-black/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${stat.value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          className="h-full"
          style={{
            background: `linear-gradient(90deg, ${stat.color}, transparent)`,
            boxShadow: `0 0 12px ${stat.color}`,
          }}
        />
      </div>
    </div>
  );
}

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <div className="font-pixel text-[10px] tracking-[0.3em] text-[var(--neon-blue)] text-glow-blue">
        {kicker}
      </div>
      <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wider text-glow-purple md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[var(--neon-purple)] to-transparent" />
    </div>
  );
}
