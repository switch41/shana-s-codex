export function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -left-[20%] -top-[20%] h-[55%] w-[55%] rounded-full opacity-[0.08] blur-[140px]"
        style={{
          background: "radial-gradient(circle, oklch(0.58 0.08 45), transparent 70%)",
          animation: "mesh-drift-1 20s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate",
        }}
      />
      <div
        className="absolute -bottom-[15%] -right-[15%] h-[45%] w-[45%] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background: "radial-gradient(circle, oklch(0.5 0.06 50), transparent 70%)",
          animation: "mesh-drift-2 25s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate",
        }}
      />
      <div
        className="absolute left-[35%] top-[25%] h-[35%] w-[35%] rounded-full opacity-[0.05] blur-[160px]"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.1 40), transparent 70%)",
          animation: "mesh-drift-3 22s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate",
        }}
      />
    </div>
  );
}
