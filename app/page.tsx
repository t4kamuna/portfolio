import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import ParticleField from "@/components/ParticleField";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { projects } from "@/lib/projects";

const ROLE = "SOFTWARE ENGINEER";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <main className="relative overflow-hidden">
      {/* Hero: 粒子が名前を形成し、スクロールで拡散する */}
      <section className="relative h-[100svh]">
        <ParticleField text="t4kamuna" />
        <div className="pointer-events-none absolute inset-x-0 bottom-24 flex flex-col items-center gap-3 px-4 text-center">
          {/* 肩書きは1文字ずつタイプされるように登場する */}
          <p className="font-mono text-sm tracking-[0.3em] text-muted">
            {ROLE.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block opacity-0"
                style={{
                  animation: "fade-in 0.05s linear forwards",
                  animationDelay: `${600 + i * 50}ms`,
                }}
              >
                {char === " " ? " " : char}
              </span>
            ))}
            <span
              aria-hidden
              className="ml-1.5 inline-block h-3.5 w-2 translate-y-0.5 bg-accent"
              style={{ animation: "blink 1.1s step-end infinite" }}
            />
          </p>
          <p
            className="fade-up-in max-w-xl text-sm leading-relaxed text-muted"
            style={{ animationDelay: "1800ms" }}
          >
            【TODO: 実データに差し替え】肩書きと一言(例:
            Webフロントエンドを中心に、動くもの・触れるものを作っています)
          </p>
        </div>
        <ChevronDown
          size={20}
          className="fade-up-in absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-muted"
          style={{ animationDelay: "2200ms" }}
        />
      </section>

      {/* 流れるテキスト帯 */}
      <Marquee
        items={[
          "Software Engineer",
          "Web",
          "TypeScript",
          "Creative Coding",
          "Interactive",
        ]}
      />

      {/* About teaser */}
      <section className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6">
        <div className="glow-blob -left-32 top-0 h-72 w-72 bg-accent-2" />
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-accent">
            01 — ABOUT
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            About <span className="gradient-text">me</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            【TODO: 実データに差し替え】自己紹介を3〜4行で。何をしてきた人で、いま何に興味があり、どんな仕事がしたいか。
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm text-accent"
          >
            経歴・スキルを見る
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </Reveal>
      </section>

      {/* Featured projects */}
      <section className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6">
        <div className="glow-blob -right-32 top-10 h-72 w-72 bg-accent" />
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-accent">
            02 — WORKS
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Featured <span className="gradient-text">projects</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 120} className="flex">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <Link
            href="/projects"
            className="group mt-10 inline-flex items-center gap-1.5 text-sm text-accent"
          >
            すべてのプロジェクトを見る
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </Reveal>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-5xl px-4 py-28 sm:px-6">
        <Reveal>
          <div className="dot-grid relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/10 to-accent-2/10 p-10 text-center backdrop-blur-md sm:p-16">
            <p className="font-mono text-xs tracking-[0.3em] text-accent">
              03 — CONTACT
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Let&apos;s <span className="gradient-text">connect</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
              お仕事のご相談・技術の話など、お気軽にご連絡ください。
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_36px_rgba(255,0,64,0.5)]"
            >
              Contact
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
