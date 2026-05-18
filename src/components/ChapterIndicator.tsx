import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const chapters = [
  { id: "hero", label: "Introduction", chapter: "01" },
  { id: "about", label: "About", chapter: "02" },
  { id: "projects", label: "Work", chapter: "03" },
  { id: "skills", label: "Practice", chapter: "04" },
  { id: "experience", label: "History", chapter: "05" },
  { id: "contact", label: "Contact", chapter: "06" },
];

const input = [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1];
const output = [0, 0, 1, 2, 3, 4, 5];

export function ChapterIndicator() {
  const { scrollYProgress } = useScroll();
  const rawIndex = useTransform(scrollYProgress, input, output);

  return (
    <nav className="pointer-events-none fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="flex flex-col items-center gap-5">
        {chapters.map((ch, i) => (
          <ChapterDot key={ch.id} chapter={ch} index={i} rawIndex={rawIndex} />
        ))}
        <div className="mt-2 h-12 w-px bg-gradient-to-b from-[var(--primary)]/15 to-transparent" />
      </div>
    </nav>
  );
}

function ChapterDot({
  chapter,
  index,
  rawIndex,
}: {
  chapter: (typeof chapters)[number];
  index: number;
  rawIndex: MotionValue<number>;
}) {
  const isActive = useTransform(rawIndex, (v) => Math.round(v) === index);
  const scale = useTransform(isActive, (v) => (v ? 1 : 0.5));
  const dotOpacity = useTransform(isActive, (v) => (v ? 0.6 : 0.15));
  const labelOpacity = useTransform(isActive, (v) => (v ? 1 : 0));
  const labelX = useTransform(isActive, (v) => (v ? 0 : -6));

  return (
    <a href={`#${chapter.id}`} className="group pointer-events-auto flex items-center gap-3">
      <motion.div className="relative flex h-2 w-2 items-center justify-center" style={{ scale }}>
        <motion.div
          className="h-full w-full rounded-full"
          style={{ backgroundColor: useTransform(dotOpacity, (v) => `oklch(0.58 0.08 45 / ${v})`) }}
        />
      </motion.div>
      <motion.div className="flex items-center gap-2" style={{ opacity: labelOpacity, x: labelX }}>
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
