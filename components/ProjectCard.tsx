"use client";

import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement | null>(null);

  // マウス位置を CSS 変数に流し、カード内をスポットライトが追従する
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_40px_rgba(255,0,64,0.18)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(255,0,64,0.12), transparent 65%)",
        }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <span className="shrink-0 font-mono text-xs text-muted">
          {project.year}
        </span>
      </div>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-accent/30"
          >
            {tag}
          </span>
        ))}
      </div>
      {(project.githubUrl || project.demoUrl) && (
        <div className="relative mt-5 flex gap-4 text-sm text-muted">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition hover:text-foreground"
            >
              <Github size={15} /> Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition hover:text-foreground"
            >
              <ExternalLink size={15} /> Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}
