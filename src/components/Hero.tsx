import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { TiltPortrait } from "./TiltPortrait";
import { RevealText } from "./RevealText";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[oklch(0.11_0.008_270/0.3)] via-transparent to-[oklch(0.11_0.008_270)]" />

      <a href="#projects" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-[var(--primary)]">
        Skip to content
      </a>
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-8 py-20 md:grid-cols-[1.3fr_1fr] md:px-12 md:py-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-5 font-mono text-[11px] tracking-[0.25em] text-[var(--primary)] uppercase"
          >
            SDE · AI/ML Engineer
          </motion.p>

          <RevealText
            as="h1"
            className="font-display text-2xl font-black leading-[0.9] tracking-tight text-foreground whitespace-nowrap sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl"
            stagger={0.04}
            delay={0.4}
          >
            Kushal Parihar
          </RevealText>

          <div className="mt-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[var(--primary)]/50 uppercase">
            <span className="h-px w-4 bg-[var(--primary)]/20" />
            aka switch41
            <span className="h-px w-4 bg-[var(--primary)]/20" />
          </div>

          <RevealText
            as="p"
            className="mt-5 max-w-[40ch] font-serif text-lg leading-relaxed text-muted-foreground md:text-xl"
            stagger={0.02}
            delay={1.0}
            mode="words"
          >
            AI and full-stack developer from Hyderabad. I build things that work — fast, scrappy,
            and real. If it's unsolved, I'm interested.
          </RevealText>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Magnetic strength={0.3}>
              <motion.a
                href="#projects"
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-[var(--primary)]/30 bg-[var(--primary)]/8 px-7 py-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--primary)] transition-all hover:bg-[var(--primary)]/15 hover:shadow-gold"
              >
                View the work
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-transparent px-7 py-3 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all hover:text-foreground"
              >
                Get in touch
              </motion.a>
            </Magnetic>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-14 flex items-center gap-3 font-serif text-sm italic text-muted-foreground/60"
          >
            <span className="h-px w-6 bg-muted-foreground/20" />
            Open for collaborations
          </motion.div>
        </motion.div>

        <TiltPortrait />
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/40 uppercase">
          Scroll
        </span>
      </motion.div>

      <svg className="hidden">
        <defs>
          <filter id="luma-key" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -1.5 -1.5 -1.5 4.5 0"
            />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
