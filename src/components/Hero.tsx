import { motion } from "framer-motion";
import shanaVideo from "@/assets/shana.mp4.asset.json";
import shanaPoster from "@/assets/shana.png";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Aura rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-[700px] w-[700px] rounded-full border border-[var(--neon-purple)]/20 animate-spin-slow"
          style={{ boxShadow: "inset 0 0 80px oklch(0.7 0.3 305 / 0.15)" }}
        />
        <div className="absolute inset-10 rounded-full border border-[var(--neon-crimson)]/15 animate-spin-slower" />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.05_0.02_290/0.8)_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <div className="mb-4 inline-block font-pixel text-[10px] tracking-[0.3em] text-[var(--neon-blue)] text-glow-blue">
            ▸ PRESS START
          </div>
          <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-wider md:text-7xl lg:text-8xl">
            <span className="block text-glow-purple">SHANA</span>
            <span className="mt-2 block text-2xl font-light text-[var(--neon-crimson)] text-glow-crimson md:text-3xl">
              the Developer
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md font-body text-base text-muted-foreground md:mx-0 md:text-lg">
            A nightbound coder forging interfaces, AI rituals, and pixel-perfect weapons in
            the void between dawns.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start md:justify-start">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-[var(--neon-purple)] bg-[var(--neon-purple)]/10 px-8 py-3 font-pixel text-xs uppercase tracking-widest text-[var(--neon-purple)] text-glow-purple shadow-neon-purple transition-colors hover:bg-[var(--neon-purple)]/25"
            >
              ▶ Enter Portfolio
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center border-2 border-[var(--neon-crimson)]/60 bg-transparent px-8 py-3 font-pixel text-xs uppercase tracking-widest text-[var(--neon-crimson)] text-glow-crimson transition-colors hover:bg-[var(--neon-crimson)]/15"
            >
              ✦ Summon Me
            </motion.a>
          </div>

          <div className="mt-10 flex items-center gap-6 font-pixel text-[9px] tracking-widest text-muted-foreground md:justify-start">
            <span>LV.99</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[var(--neon-purple)]/40 to-transparent" />
            <span>NIGHT 20:00</span>
          </div>
        </motion.div>

        {/* Shana */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.3_305/0.35),transparent_70%)] blur-2xl" />
          <motion.video
            src={shanaVideo.url}
            poster={shanaPoster}
            autoPlay
            loop
            muted
            playsInline
            className="relative z-10 h-[360px] w-auto select-none animate-pulse-glow md:h-[480px]"
            style={{ mixBlendMode: "screen" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* HUD reticle */}
          <div className="pointer-events-none absolute right-0 top-8 hidden flex-col items-end gap-2 font-pixel text-[9px] text-[var(--neon-crimson)] md:flex">
            <span>◆ HP ████████░░</span>
            <span>◆ MP ██████████</span>
            <span>◆ XP ████████░░</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[9px] tracking-widest text-muted-foreground"
      >
        ▼ SCROLL TO BEGIN
      </motion.div>
    </section>
  );
}
