import { motion } from "framer-motion";
import { RevealText } from "./RevealText";

export function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--primary)]/60 uppercase">
        {kicker}
      </div>
      <RevealText
        as="h2"
        className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        stagger={0.03}
        mode="chars"
      >
        {title}
      </RevealText>
      {subtitle && (
        <RevealText
          as="p"
          className="mt-3 max-w-[55ch] font-serif text-base italic leading-relaxed text-muted-foreground"
          stagger={0.015}
          delay={0.3}
          mode="words"
        >
          {subtitle}
        </RevealText>
      )}
      <div className="mt-6 h-px w-16 divider-gradient" />
    </motion.div>
  );
}
