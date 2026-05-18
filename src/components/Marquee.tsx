import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const SKILLS = [
  "Python",
  "Conversational AI",
  "Prompt Engineering",
  "LLM Fine-tuning",
  "NLP",
  "Brand Design",
  "Figma",
  "Data Analytics",
  "ETL",
  "AI Pipelines",
  "RAG",
  "LangChain",
  "SaaS",
  "Workflow Automation",
  "Visual Identity",
  "Intent Routing",
  "Dataset Curation",
]

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const speed = useTransform(scrollY, [0, 1000], [1, 2.5])

  const items = [...SKILLS, ...SKILLS, ...SKILLS]

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      {/* Top divider */}
      <div className="mx-auto h-px w-full max-w-[1400px] divider-gradient" />

      <div ref={ref} className="relative mt-8 overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-8 md:gap-12"
          style={{ x: useTransform(speed, (v) => ["0%", `-${33.33}%`]) }}
          animate={{
            x: ["0%", `-${33.33}%`],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {items.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="flex shrink-0 items-center gap-8 md:gap-12"
            >
              <span className="font-display text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--primary)]/30 whitespace-nowrap md:text-xs">
                {skill}
              </span>
              <span className="inline-block h-3 w-px bg-[var(--primary)]/10" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="mx-auto mt-8 h-px w-full max-w-[1400px] divider-gradient" />
    </section>
  )
}
