import { motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./StatsPanel";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionTitle kicker="// SUMMONING CIRCLE" title="Open the Final Portal" />

        <div className="relative mt-16">
          {/* Summoning circle */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="h-[520px] w-[520px] rounded-full border border-[var(--neon-purple)]/30 animate-spin-slow"
              style={{ boxShadow: "0 0 80px oklch(0.7 0.3 305 / 0.2), inset 0 0 80px oklch(0.7 0.3 305 / 0.1)" }}
            />
            <div className="absolute inset-12 rounded-full border border-[var(--neon-crimson)]/20 animate-spin-slower" />
            <div className="absolute inset-24 rounded-full border border-dashed border-[var(--neon-blue)]/30 animate-spin-slow" />
          </div>

          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hud-panel relative z-10 mx-auto max-w-lg space-y-5 p-8"
          >
            <Field label="◆ NAME" type="text" placeholder="Your true name…" />
            <Field label="◆ SIGIL (EMAIL)" type="email" placeholder="rune@void.realm" />
            <div>
              <label className="mb-2 block font-pixel text-[9px] tracking-widest text-[var(--neon-purple)] text-glow-purple">
                ◆ INCANTATION
              </label>
              <textarea
                required
                rows={4}
                placeholder="Speak your message into the void…"
                className="w-full resize-none border-2 border-[var(--neon-purple)]/40 bg-black/40 px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--neon-purple)] focus:outline-none focus:shadow-neon-purple"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full border-2 border-[var(--neon-crimson)] bg-[var(--neon-crimson)]/10 py-3 font-pixel text-xs uppercase tracking-widest text-[var(--neon-crimson)] text-glow-crimson shadow-neon-crimson transition-colors hover:bg-[var(--neon-crimson)]/25"
            >
              {sent ? "✦ Portal Opened ✦" : "✦ Cast the Spell ✦"}
            </motion.button>

            <div className="flex items-center justify-center gap-6 pt-4 font-pixel text-[9px] tracking-widest text-muted-foreground">
              <a href="#" className="transition-colors hover:text-[var(--neon-purple)]">GITHUB</a>
              <span>·</span>
              <a href="#" className="transition-colors hover:text-[var(--neon-blue)]">TWITTER</a>
              <span>·</span>
              <a href="#" className="transition-colors hover:text-[var(--neon-crimson)]">DISCORD</a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-2 block font-pixel text-[9px] tracking-widest text-[var(--neon-purple)] text-glow-purple">
        {label}
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="w-full border-2 border-[var(--neon-purple)]/40 bg-black/40 px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--neon-purple)] focus:outline-none focus:shadow-neon-purple"
      />
    </div>
  );
}
