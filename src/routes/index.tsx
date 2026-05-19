import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
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

const MeshGradient = lazy(() =>
  import("@/components/MeshGradient").then((m) => ({ default: m.MeshGradient })),
);
const Embers = lazy(() =>
  import("@/components/Embers").then((m) => ({ default: m.Embers })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [],
  }),
});

function Index() {
  return (
    <>
      <IntroScreen />
      <main className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[1] grain opacity-30" />
      <ScrollProgress />
      <Suspense fallback={null}><MeshGradient /></Suspense>
      <Suspense fallback={null}><Embers /></Suspense>
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
