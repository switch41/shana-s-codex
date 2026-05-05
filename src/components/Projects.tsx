import { motion } from "framer-motion";
import { Sword, Sparkles, Zap, Flame, Skull, Wand2 } from "lucide-react";
import { SectionTitle } from "./StatsPanel";

const projects = [
  {
    name: "Voidcaster",
    type: "Weapon · Mythic",
    desc: "Real-time AI chat orchestrator with streaming agents and tool calls.",
    stats: "DMG 95 / RNG 80 / RARITY ✦✦✦✦",
    icon: Wand2,
    color: "var(--neon-purple)",
  },
  {
    name: "Emberforge",
    type: "Weapon · Legendary",
    desc: "Component library with neon variants and glow primitives.",
    stats: "DMG 88 / RNG 72 / RARITY ✦✦✦✦",
    icon: Flame,
    color: "var(--neon-crimson)",
  },
  {
    name: "Nightlens",
    type: "Ability · Epic",
    desc: "Computer-vision dashboard for low-light object detection.",
    stats: "DMG 90 / RNG 95 / RARITY ✦✦✦",
    icon: Sparkles,
    color: "var(--neon-blue)",
  },
  {
    name: "Hexrouter",
    type: "Ability · Rare",
    desc: "Type-safe edge router with sub-millisecond latency.",
    stats: "DMG 78 / RNG 99 / RARITY ✦✦✦",
    icon: Zap,
    color: "var(--neon-purple)",
  },
  {
    name: "Bonepicker",
    type: "Weapon · Epic",
    desc: "Database introspector that visualizes schemas like dungeon maps.",
    stats: "DMG 82 / RNG 65 / RARITY ✦✦✦",
    icon: Skull,
    color: "var(--neon-crimson)",
  },
  {
    name: "Dawnblade",
    type: "Weapon · Mythic",
    desc: "Build-once deploy-anywhere SSR framework with edge runtime.",
    stats: "DMG 96 / RNG 88 / RARITY ✦✦✦✦",
    icon: Sword,
    color: "var(--neon-blue)",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="// ARMORY" title="Weapons & Abilities" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="group relative cursor-pointer"
              >
                <div
                  className="hud-panel relative overflow-hidden p-6 transition-all duration-300 group-hover:border-[var(--neon-purple)]"
                  style={{ ["--hover-color" as never]: p.color }}
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at top, ${p.color}22, transparent 70%)` }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-14 w-14 items-center justify-center border-2"
                        style={{
                          borderColor: p.color,
                          background: `${p.color}15`,
                          boxShadow: `0 0 20px ${p.color}66`,
                        }}
                      >
                        <Icon className="h-7 w-7" style={{ color: p.color }} />
                      </div>
                      <div className="font-pixel text-[8px] tracking-widest text-muted-foreground">
                        {p.type}
                      </div>
                    </div>
                    <h3
                      className="mt-5 font-display text-2xl font-bold uppercase tracking-wider"
                      style={{ color: p.color, textShadow: `0 0 12px ${p.color}88` }}
                    >
                      {p.name}
                    </h3>
                    <p className="mt-3 font-body text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-5 border-t border-[var(--neon-purple)]/20 pt-3 font-pixel text-[8px] tracking-widest text-foreground/70">
                      {p.stats}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
