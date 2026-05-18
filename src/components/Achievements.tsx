import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = { id: number; title: string };

const SECTIONS: Record<string, string> = {
  about: "About this developer",
  projects: "Selected projects",
  skills: "Tools and practice",
  experience: "Career history",
  contact: "Contact section",
};

export function Achievements() {
  const [items, setItems] = useState<Item[]>([]);
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
          const next = { id: ++idRef.current, title: SECTIONS[id] };
          setItems((prev) => [...prev, next]);
          setTimeout(() => {
            setItems((prev) => prev.filter((x) => x.id !== next.id));
          }, 4500);
        }
      },
      { threshold: 0.4 },
    );
    Object.keys(SECTIONS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-50 flex flex-col gap-2.5">
      <AnimatePresence>
        {items.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -24, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass-panel flex items-center gap-3 rounded-xl px-4 py-2.5"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--primary)]/15 bg-[var(--primary)]/8">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]/60" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[8px] tracking-widest text-[var(--primary)]/50 uppercase">
                Section
              </div>
              <div className="mt-0.5 font-display text-xs tracking-wide text-foreground/80">
                {a.title}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
