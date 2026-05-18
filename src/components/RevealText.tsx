import { motion, type Variants } from "framer-motion"

type As = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"

interface RevealTextProps {
  children: string
  as?: As
  className?: string
  delay?: number
  stagger?: number
  mode?: "chars" | "words"
  once?: boolean
}

const container: Variants = {
  hidden: {},
  show: {},
}

function charVariant(delay: number, stagger: number): Variants {
  return {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: delay + i * stagger,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }
}

export function RevealText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  stagger = 0.025,
  mode = "chars",
  once = true,
}: RevealTextProps) {
  if (mode === "words") {
    const words = children.split(/(\s+)/)
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-80px" }}
        className={className}
      >
        {words.map((word, i) =>
          /^\s+$/.test(word) ? (
            <span key={i} className="inline-block">&nbsp;</span>
          ) : (
            <motion.span
              key={i}
              custom={i}
              variants={charVariant(delay, stagger)}
              className="inline-block"
            >
              {word}
            </motion.span>
          )
        )}
      </motion.div>
    )
  }

  const chars = children.split("")
  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-80px" }}
        className="inline-flex flex-wrap"
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={charVariant(delay, stagger)}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
