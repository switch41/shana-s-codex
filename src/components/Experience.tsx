import { motion } from "framer-motion";
import { SectionTitle } from "./StatsPanel";

const levels = [
  { lv: "LV.27", year: "2024 — Now", title: "Lead Frontend Sorcerer", org: "Voidworks Studio", desc: "Architecting AI-driven product UI and design systems." },
  { lv: "LV.20", year: "2022 — 2024", title: "Full-Stack Engineer", org: "Crimson Labs", desc: "Shipped real-time analytics platform; led 4-dev guild." },
  { lv: "LV.12", year: "2020 — 2022", title: "Software Engineer", org: "Nightfall Inc.", desc: "Built the original SSR framework. Defeated 1.2k bugs." },
  { lv: "LV.05", year: "2019", title: "Junior Apprentice", org: "Dawn Forge", desc: "Trained in the dark arts of React and Node." },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionTitle kicker="// LEVEL HISTORY" title="Progression Log" />

        <div className="relative mt-14">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--neon-purple)] via-[var(--neon-crimson)] to-transparent md:left-1/2" />
          <div className="space-y-12">
            {levels.map((l, i) => (
              <motion.div
                key={l.lv}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative pl-16 md:grid md:grid-cols-2 md:gap-12 md:pl-0 ${
                  i % 2 === 0 ? "md:text-right" : "md:[&>*:first-child]:order-2 md:text-left"
                }`}
              >
                {/* Node */}
                <div className="absolute left-3 top-2 z-10 h-6 w-6 -translate-x-1/2 rotate-45 border-2 border-[var(--neon-purple)] bg-background shadow-neon-purple md:left-1/2" />

                <div className={i % 2 === 0 ? "md:pr-12" : "md:pl-12"}>
                  <div className="font-pixel text-[10px] tracking-widest text-[var(--neon-crimson)] text-glow-crimson">
                    {l.lv} · {l.year}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-glow-purple">{l.title}</h3>
                  <div className="mt-1 font-body text-sm text-[var(--neon-blue)]">{l.org}</div>
                  <p className="mt-2 font-body text-sm text-muted-foreground">{l.desc}</p>
                </div>
                <div />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
