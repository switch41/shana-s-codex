import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import shanaVideo from "@/assets/shana.mp4";
import shanaPoster from "@/assets/shana.png";

export function TiltPortrait() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 12 });
  const springY = useSpring(y, { stiffness: 120, damping: 12 });

  const rotateX = useTransform(springY, [-1, 1], [6, -6]);
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);

  const glowX = useTransform(springX, [-1, 1], [30, 70]);
  const glowY = useTransform(springY, [-1, 1], [30, 70]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px * 2 - 1);
    y.set(py * 2 - 1);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative flex items-center justify-center"
    >
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]: number[]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, oklch(0.58 0.08 45 / 0.1), transparent 70%)`,
          ),
        }}
      />

      <div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        className="relative"
        style={{ perspective: "800px" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute -inset-2 rounded-[2rem] border border-[var(--primary)]/10" />
          <div className="absolute -inset-4 rounded-[2.5rem] border border-[var(--primary)]/5" />
          <video
            src={shanaVideo}
            poster={shanaPoster}
            autoPlay
            loop
            muted
            playsInline
            className="relative h-[340px] w-auto select-none md:h-[440px]"
            style={{ filter: "url(#luma-key)" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
