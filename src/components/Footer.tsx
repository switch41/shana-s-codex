import { motion } from "framer-motion"
import { ArrowUp, Github, Linkedin } from "lucide-react"

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "History" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-[var(--primary)]/8 px-8 pb-8 pt-16 md:pt-20">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent" />

      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/8">
                <span className="font-mono text-[9px] font-bold tracking-tight text-[var(--primary)]">
                  41
                </span>
              </div>
              <div>
                <div className="font-display text-sm font-bold tracking-tight text-foreground">
                  Kushal Parihar
                </div>
                <div className="font-mono text-[9px] tracking-widest text-[var(--primary)]/50 uppercase">
                  switch
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-xs font-serif text-xs italic leading-relaxed text-muted-foreground/50">
              AI and full-stack developer from Hyderabad. Building at the intersection of software
              engineering and machine learning.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:justify-self-center">
            <div className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/40 uppercase">
              Navigate
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-display text-xs text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:justify-self-end">
            <div className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground/40 uppercase">
              Connect
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/switch41"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--primary)]/10 bg-[var(--primary)]/5 text-muted-foreground transition-all hover:border-[var(--primary)]/25 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/kushal-parihar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--primary)]/10 bg-[var(--primary)]/5 text-muted-foreground transition-all hover:border-[var(--primary)]/25 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--primary)]/8 pt-6 md:flex-row">
          <div className="font-serif text-[10px] italic tracking-wide text-muted-foreground/30">
            &copy; {new Date().getFullYear()} Kushal Parihar &mdash; Built with intent
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-full border border-[var(--primary)]/15 bg-[var(--primary)]/8 px-4 py-2 font-mono text-[9px] tracking-wider text-[var(--primary)]/60 transition-all hover:border-[var(--primary)]/25 hover:text-[var(--primary)]"
          >
            <ArrowUp className="h-3 w-3" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
