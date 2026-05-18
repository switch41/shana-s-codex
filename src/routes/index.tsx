import { createFileRoute } from "@tanstack/react-router";
import { Embers } from "@/components/Embers";
import { Hero } from "@/components/Hero";
import { StatsPanel } from "@/components/StatsPanel";
import { Projects } from "@/components/Projects";
import { SkillTree } from "@/components/SkillTree";
import { IntroScreen } from "@/components/IntroScreen";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Nav } from "@/components/Nav";
import { Achievements } from "@/components/Achievements";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ChapterIndicator } from "@/components/ChapterIndicator";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { MeshGradient } from "@/components/MeshGradient";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Kushal's Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Kushal (switch41): AI and full-stack developer from Hyderabad building things that work.",
      },
      { property: "og:title", content: "Kushal's Portfolio" },
      {
        property: "og:description",
        content: "AI and full-stack developer from Hyderabad. If it's unsolved, I'm interested.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <IntroScreen />
      <main className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[1] grain opacity-30" />
      <ScrollProgress />
      <MeshGradient />
      <Embers />
      <Nav />
      <ChapterIndicator />
      <Achievements />
      <div className="relative z-10">
        <Hero />
        <Marquee />
        <StatsPanel />
        <Projects />
        <SkillTree />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
    </>
  );
}
