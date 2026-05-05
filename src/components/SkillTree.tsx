import { motion } from "framer-motion";
import { SectionTitle } from "./StatsPanel";

type Node = { id: string; label: string; x: number; y: number; tier: 1 | 2 | 3 };

const nodes: Node[] = [
  { id: "core", label: "CORE", x: 50, y: 50, tier: 1 },
  { id: "ts", label: "TypeScript", x: 25, y: 25, tier: 2 },
  { id: "react", label: "React", x: 75, y: 25, tier: 2 },
  { id: "node", label: "Node", x: 25, y: 75, tier: 2 },
  { id: "ai", label: "AI/ML", x: 75, y: 75, tier: 2 },
  { id: "next", label: "Next", x: 10, y: 10, tier: 3 },
  { id: "tw", label: "Tailwind", x: 90, y: 10, tier: 3 },
  { id: "pg", label: "Postgres", x: 10, y: 90, tier: 3 },
  { id: "lang", label: "LangChain", x: 90, y: 90, tier: 3 },
];

const links: [string, string][] = [
  ["core", "ts"], ["core", "react"], ["core", "node"], ["core", "ai"],
  ["ts", "next"], ["react", "tw"], ["node", "pg"], ["ai", "lang"],
];

const colorByTier = (t: number) =>
  t === 1 ? "var(--neon-crimson)" : t === 2 ? "var(--neon-purple)" : "var(--neon-blue)";

export function SkillTree() {
  const find = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle kicker="// UPGRADE TREE" title="Skill Constellation" />

        <div className="relative mx-auto mt-12 aspect-square w-full max-w-2xl">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-[var(--neon-purple)]/20 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-[var(--neon-crimson)]/15 animate-spin-slower" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {links.map(([a, b], i) => {
              const A = find(a);
              const B = find(b);
              return (
                <motion.line
                  key={i}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="oklch(0.7 0.3 305 / 0.5)"
                  strokeWidth={0.3}
                  strokeDasharray="1 1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {nodes.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08, type: "spring" }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div
                className="group relative flex cursor-pointer items-center justify-center rounded-full border-2 bg-background/80 transition-transform hover:scale-110"
                style={{
                  width: n.tier === 1 ? 80 : n.tier === 2 ? 60 : 48,
                  height: n.tier === 1 ? 80 : n.tier === 2 ? 60 : 48,
                  borderColor: colorByTier(n.tier),
                  boxShadow: `0 0 20px ${colorByTier(n.tier)}, inset 0 0 15px ${colorByTier(n.tier)}44`,
                }}
              >
                <span
                  className="font-pixel text-[8px] uppercase tracking-wider"
                  style={{ color: colorByTier(n.tier), textShadow: `0 0 8px ${colorByTier(n.tier)}` }}
                >
                  {n.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
