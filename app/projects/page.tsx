import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import ComingSoon from "@/components/ComingSoon";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "t4kamuna の制作物・実験のアーカイブ。",
};

export default function ProjectsPage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-5xl overflow-hidden px-4 pb-24 pt-32 sm:px-6">
      <div className="glow-blob -right-32 top-20 h-72 w-72 bg-accent-2" />
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-accent">
          WORKS ARCHIVE
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          <span className="gradient-text">Projects</span>
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          制作物と実験のアーカイブ。
        </p>
      </Reveal>
      {projects.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 120} className="flex">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={200}>
          <div className="mt-12">
            <ComingSoon />
          </div>
        </Reveal>
      )}
    </main>
  );
}
