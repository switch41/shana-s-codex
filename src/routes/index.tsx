import { createFileRoute } from "@tanstack/react-router";
import { Embers } from "@/components/Embers";
import { Hero } from "@/components/Hero";
import { StatsPanel } from "@/components/StatsPanel";
import { Projects } from "@/components/Projects";
import { SkillTree } from "@/components/SkillTree";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Nav } from "@/components/Nav";
import { Achievements } from "@/components/Achievements";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shana — Nightbound Developer Portfolio" },
      {
        name: "description",
        content:
          "A roguelike-inspired developer portfolio: full-stack engineer, AI alchemist, and pixel-perfect interface hunter.",
      },
      { property: "og:title", content: "Shana — Nightbound Developer Portfolio" },
      {
        property: "og:description",
        content: "Enter the void. Forge interfaces. Hunt bugs till dawn.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[1] scanlines opacity-40" />
      <Embers />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <StatsPanel />
        <Projects />
        <SkillTree />
        <Experience />
        <Contact />
        <footer className="relative px-6 py-10 text-center font-pixel text-[9px] tracking-widest text-muted-foreground">
          ◆ GAME OVER · INSERT COIN TO CONTINUE · © {new Date().getFullYear()} SHANA ◆
        </footer>
      </div>
    </main>
  );
}
