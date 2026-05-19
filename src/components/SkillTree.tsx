import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

type Node = { id: string; label: string; x: number; y: number; tier: 1 | 2 | 3 };

const nodes: Node[] = [
  { id: "core", label: "CORE", x: 50, y: 50, tier: 1 },
  { id: "python", label: "PYTHON", x: 50, y: 25, tier: 2 },
  { id: "node", label: "NODE", x: 71.65, y: 37.5, tier: 2 },
  { id: "tailwind", label: "TAILWIND", x: 71.65, y: 62.5, tier: 2 },
  { id: "convex", label: "CONVEX", x: 50, y: 75, tier: 2 },
  { id: "rest", label: "REST APIs", x: 28.35, y: 62.5, tier: 2 },
  { id: "git", label: "GIT", x: 28.35, y: 37.5, tier: 2 },
  { id: "pytorch", label: "PYTORCH", x: 50, y: 12, tier: 3 },
  { id: "huggingface", label: "HUGGINGFACE", x: 76.87, y: 23.13, tier: 3 },
  { id: "react", label: "REACT", x: 88, y: 50, tier: 3 },
  { id: "typescript", label: "TYPESCRIPT", x: 76.87, y: 76.87, tier: 3 },
  { id: "docker", label: "DOCKER", x: 50, y: 88, tier: 3 },
  { id: "spacy", label: "SPACY", x: 23.13, y: 76.87, tier: 3 },
  { id: "fastapi", label: "FASTAPI", x: 12, y: 50, tier: 3 },
  { id: "flask", label: "FLASK", x: 23.13, y: 23.13, tier: 3 },
];

const links: [string, string][] = [
  ["core", "python"],
  ["core", "node"],
  ["core", "tailwind"],
  ["core", "convex"],
  ["core", "rest"],
  ["core", "git"],
  ["core", "pytorch"],
  ["core", "huggingface"],
  ["core", "react"],
  ["core", "typescript"],
  ["core", "docker"],
  ["core", "spacy"],
  ["core", "fastapi"],
  ["core", "flask"],
];

const nodeVariants = {
  hidden: { opacity: 0, scale: 0 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.4 + i * 0.05,
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
    },
  }),
};

export function SkillTree() {
  const find = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section id="skills" className="relative px-8 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          kicker="Practice"
          title="Tools of the trade"
          subtitle="From React to PyTorch, edge deployment to model training — the full spectrum of what I work with."
        />

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-2xl">
          <div className="absolute inset-0 rounded-full border border-[var(--primary)]/8" />
          <div className="absolute inset-16 rounded-full border border-[var(--primary)]/5" />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
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
                  stroke="oklch(0.58 0.08 45 / 0.15)"
                  strokeWidth={0.4}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </svg>

          {nodes.map((n, i) => (
            <motion.div
              key={n.id}
              custom={i}
              variants={nodeVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div
                className={`group relative flex cursor-pointer items-center justify-center rounded-full bg-[oklch(0.14_0.01_270)] transition-transform duration-200 hover:scale-110 ${
                  n.tier === 1
                    ? "size-16 sm:size-20"
                    : n.tier === 2
                      ? "size-12 sm:size-[60px]"
                      : "size-[38px] sm:size-12"
                }`}
                style={{
                  border: "1px solid oklch(0.58 0.08 45 / 0.2)",
                }}
              >
                {n.tier === 1 && (
                  <span
                    className="absolute inset-0 rounded-full animate-breathe"
                    style={{ border: "1px solid oklch(0.58 0.08 45 / 0.12)" }}
                  />
                )}
                <span className="font-display text-[7px] uppercase tracking-widest text-[var(--primary)]/80 sm:text-[8px]">
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
