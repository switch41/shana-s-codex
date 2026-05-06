import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Achievement = { id: number; title: string; section: string };

const SECTIONS: Record<string, string> = {
  about: "Inspected the Hunter",
  projects: "Scrolled to the Armory",
  skills: "Unlocked the Skill Tree",
  experience: "Opened the Battle Log",
  contact: "Reached the Summoning Circle",
};

export function Achievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const seen = useRef<Set<string>>(new Set());
  const idRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          if (!SECTIONS[id] || seen.current.has(id)) continue;
          seen.current.add(id);
          const next = { id: ++idRef.current, title: SECTIONS[id], section: id };
          setItems((prev) => [...prev, next]);
          setTimeout(() => {
            setItems((prev) => prev.filter((x) => x.id !== next.id));
          }, 4200);
        }
      },
      { threshold: 0.35 },
    );
    Object.keys(SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {items.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="hud-panel relative flex items-center gap-3 px-4 py-3 backdrop-blur-md"
            style={{
              boxShadow:
                "0 0 24px oklch(0.7 0.3 305 / 0.35), inset 0 0 12px oklch(0.7 0.3 305 / 0.15)",
            }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--neon-purple)] bg-[var(--neon-purple)]/15 text-[var(--neon-purple)] text-glow-purple">
              ✦
            </div>
            <div className="min-w-0">
              <div className="font-pixel text-[8px] tracking-[0.25em] text-[var(--neon-blue)] text-glow-blue">
                ▸ ACHIEVEMENT UNLOCKED
              </div>
              <div className="mt-1 font-display text-sm uppercase tracking-wider text-foreground">
                {a.title}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
