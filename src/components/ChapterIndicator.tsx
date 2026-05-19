import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const chapters = [
  { id: "hero", label: "Introduction", chapter: "01" },
  { id: "about", label: "About", chapter: "02" },
  { id: "projects", label: "Work", chapter: "03" },
  { id: "skills", label: "Practice", chapter: "04" },
  { id: "experience", label: "History", chapter: "05" },
  { id: "contact", label: "Contact", chapter: "06" },
];

export function ChapterIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target.id, e.intersectionRatio);
        }
        let maxRatio = 0;
        let maxId = chapters[0].id;
        for (const { id } of chapters) {
          const r = ratios.get(id) ?? 0;
          if (r > maxRatio) {
            maxRatio = r;
            maxId = id;
          }
        }
        setActive(chapters.findIndex((ch) => ch.id === maxId));
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );

    for (const { id } of chapters) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="pointer-events-none fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="flex flex-col items-center gap-5">
        {chapters.map((ch, i) => (
          <ChapterDot key={ch.id} chapter={ch} active={i === active} />
        ))}
        <div className="mt-2 h-12 w-px bg-gradient-to-b from-[var(--primary)]/15 to-transparent" />
      </div>
    </nav>
  );
}

function ChapterDot({
  chapter,
  active,
}: {
  chapter: (typeof chapters)[number];
  active: boolean;
}) {
  return (
    <a href={`#${chapter.id}`} className="group pointer-events-auto flex items-center gap-3">
      <motion.div
        className="relative flex h-2 w-2 items-center justify-center"
        animate={{ scale: active ? 1 : 0.5 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="h-full w-full rounded-full"
          animate={{ opacity: active ? 0.6 : 0.15 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ backgroundColor: `oklch(0.58 0.08 45 / 1)` }}
        />
      </motion.div>
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : -6 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <span className="font-mono text-[9px] tracking-widest text-[var(--primary)]/50">
          {chapter.chapter}
        </span>
        <span className="font-serif text-[10px] italic tracking-wider text-muted-foreground">
          {chapter.label}
        </span>
      </motion.div>
    </a>
  );
}
