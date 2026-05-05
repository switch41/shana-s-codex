export function Nav() {
  const links = [
    { href: "#about", label: "ABOUT" },
    { href: "#projects", label: "ARMORY" },
    { href: "#skills", label: "SKILLS" },
    { href: "#experience", label: "LOG" },
    { href: "#contact", label: "PORTAL" },
  ];
  return (
    <nav className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <div className="hud-panel flex items-center gap-1 px-3 py-2 backdrop-blur-md md:gap-2 md:px-5">
        <span className="hidden font-pixel text-[9px] tracking-widest text-[var(--neon-crimson)] text-glow-crimson md:inline">
          ◆ SHANA
        </span>
        <span className="hidden h-4 w-px bg-[var(--neon-purple)]/40 md:inline-block" />
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-2 py-1 font-pixel text-[9px] tracking-widest text-muted-foreground transition-colors hover:text-[var(--neon-purple)] hover:text-glow-purple"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
