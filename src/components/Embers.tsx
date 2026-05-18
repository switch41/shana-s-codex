import { useMemo } from "react";

export function Embers({ count = 50 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 14 + Math.random() * 20,
        size: 1 + Math.random() * 3,
        drift: -40 + Math.random() * 80,
        opacity: 0.3 + Math.random() * 0.5,
        color:
          Math.random() > 0.7
            ? "oklch(0.75 0.08 55)"
            : Math.random() > 0.4
              ? "oklch(0.65 0.12 55)"
              : "oklch(0.55 0.1 55 / 0.6)",
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={
            {
              left: `${p.left}%`,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              opacity: p.opacity,
              boxShadow: `${p.size >= 2.5 ? `0 0 ${p.size * 4}px ${p.color}` : "none"}`,
              animation: `ember-rise ${p.duration}s cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}s infinite`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
