import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { SendHorizonal, Loader2 } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { Magnetic } from "./Magnetic";

const FORM_ID = "xvzyojdr";

export function Contact() {
  const [state, handleSubmit] = useForm(FORM_ID);

  return (
    <section id="contact" className="relative px-8 py-28 md:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          kicker="Contact"
          title="Start a conversation"
          subtitle="Whether you have a project in mind or just want to say hello — I read every message."
        />

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[480px] w-[480px] rounded-full border border-[var(--primary)]/8" />
            <div className="absolute inset-20 rounded-full border border-[var(--primary)]/5" />
            <div className="absolute inset-36 rounded-full border border-dashed border-[var(--primary)]/5" />
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel relative z-10 mx-auto max-w-lg rounded-[2rem] p-8 md:p-10"
          >
            {state.succeeded ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10">
                  <SendHorizonal className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <p className="font-display text-sm uppercase tracking-[0.15em] text-[var(--primary)]">
                  Message sent
                </p>
                <p className="font-serif text-xs italic text-muted-foreground/50">
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <Field label="Name" name="name" type="text" placeholder="Your name" />
                <div>
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                  <ValidationError field="email" errors={state.errors} />
                </div>
                <div>
                  <label className="mb-2 block font-display text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-xl border border-[var(--primary)]/10 bg-black/30 px-4 py-3 font-serif text-sm text-foreground placeholder:text-muted-foreground/30 transition-all focus:border-[var(--primary)]/30 focus:outline-none"
                  />
                  <ValidationError field="message" errors={state.errors} />
                </div>

                <Magnetic strength={0.2}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={state.submitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--primary)]/25 bg-[var(--primary)]/8 px-6 py-3.5 font-display text-xs uppercase tracking-[0.15em] text-[var(--primary)] transition-all hover:bg-[var(--primary)]/12 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state.submitting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <SendHorizonal className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    )}
                    {state.submitting ? "Sending" : "Send message"}
                  </motion.button>
                </Magnetic>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-6 pt-4 font-serif text-sm italic text-muted-foreground/50">
              <a
                href="https://github.com/switch41"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <span>/</span>
              <a
                href="https://www.linkedin.com/in/kushal-parihar/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-display text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--primary)]/10 bg-black/30 px-4 py-3 font-serif text-sm text-foreground placeholder:text-muted-foreground/30 transition-all focus:border-[var(--primary)]/30 focus:outline-none"
      />
    </div>
  );
}
