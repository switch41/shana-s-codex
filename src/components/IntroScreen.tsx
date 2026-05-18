import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import shanaPoster from "@/assets/shana.png"
import shanaVideo from "@/assets/shana.mp4"

const TITLE = "SHANA"
const SPLIT = TITLE.split("")

export function IntroScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setShow(false)
      return
    }
    const timer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem("intro-seen", "true")
    }, 3800)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setShow(false)
    sessionStorage.setItem("intro-seen", "true")
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex select-none"
          onClick={dismiss}
        >
          {/* Video background */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              src={shanaVideo}
              poster={shanaPoster}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-15"
              style={{ filter: "grayscale(0.6) contrast(1.2)" }}
            />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
              backgroundSize: "100% 2px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center">
            {/* Title */}
            <div className="overflow-hidden">
              <h1 className="flex font-display text-6xl font-black tracking-[0.12em] md:text-8xl lg:text-9xl">
                {SPLIT.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block text-foreground"
                    style={{
                      textShadow:
                        "0 0 20px oklch(0.58 0.08 45 / 0.3), 0 0 60px oklch(0.58 0.08 45 / 0.1)",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 h-px w-3/4 origin-left bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent md:w-1/2"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-mono text-[10px] tracking-[0.3em] text-[var(--primary)]/50 uppercase"
            >
              AI &middot; Full-Stack &middot; Hyderabad
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.2,
                duration: 3.2,
                ease: "easeInOut",
              }}
              className="mt-14 h-[1px] w-40 origin-left overflow-hidden bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent"
              style={{ willChange: "transform" }}
            />

            {/* Enter hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: 2.8 }}
              className="mt-8 font-mono text-[9px] tracking-[0.2em] text-foreground/30"
            >
              Click anywhere to enter
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
