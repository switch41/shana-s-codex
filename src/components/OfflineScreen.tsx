import { motion } from "framer-motion";

export function OfflineScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px] rounded-full border border-[var(--primary)]/8 animate-spin-slow" />
          <div className="absolute inset-20 rounded-full border border-[var(--primary)]/5 animate-spin-slower" />
          <div className="absolute inset-40 rounded-full border border-dashed border-[var(--primary)]/5" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-md px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4 flex justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[var(--primary)]/20 animate-breathe" />
              <div className="h-3 w-3 rounded-full bg-[var(--primary)]/40" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            No signal
          </h1>

          <p className="mx-auto mt-4 max-w-sm font-serif text-base italic leading-relaxed text-muted-foreground">
            The connection dropped. This page lives somewhere beyond the reach of the current
            network.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <motion.button
              onClick={() => window.location.reload()}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-[var(--primary)]/30 bg-[var(--primary)]/8 px-7 py-3 font-display text-xs uppercase tracking-[0.2em] text-[var(--primary)] transition-all hover:bg-[var(--primary)]/15 hover:shadow-gold"
            >
              Try again
            </motion.button>

            <p className="mt-6 font-mono text-[10px] tracking-widest text-muted-foreground/30 uppercase">
              {navigator.onLine ? "Connected" : "Offline"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
