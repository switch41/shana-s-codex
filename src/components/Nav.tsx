import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "./Magnetic";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Practice" },
  { href: "#experience", label: "History" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <motion.div
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `oklch(0.11 0.008 270 / ${0.3 + v * 0.5})`,
          ),
        }}
        className="flex items-center gap-1 rounded-full border border-[var(--primary)]/10 px-2 py-1.5 backdrop-blur-xl md:gap-2 md:px-4"
      >
        <span className="hidden px-2 font-display text-xs tracking-wide text-foreground md:inline">
          Kushal
        </span>
        <span className="hidden h-3 w-px bg-muted-foreground/20 md:block" />
        {links.map((l) => (
          <Magnetic key={l.href} strength={0.15}>
            <a
              href={l.href}
              className="rounded-full px-3 py-1.5 font-display text-[10px] tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground md:text-[11px]"
            >
              {l.label}
            </a>
          </Magnetic>
        ))}
      </motion.div>
    </motion.nav>
  );
}
