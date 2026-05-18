import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-transparent via-[oklch(0.65_0.12_55)] to-transparent"
      style={{ scaleX }}
    />
  );
}
