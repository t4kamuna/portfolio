import type { Metadata } from "next";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "t4kamuna について。大学1年生の student programmer。",
};

type Skill = { name: string; Icon: IconType; color: string };

const skillGroups: { category: string; note: string; items: Skill[] }[] = [
  {
    category: "Frontend",
    note: "学習中",
    items: [
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#e2e8f0" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    category: "Language",
    note: "少し書ける",
    items: [{ name: "Python", Icon: SiPython, color: "#3776AB" }],
  },
  {
    category: "Tools",
    note: "日常的に使用",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#e2e8f0" },
      { name: "Vercel", Icon: SiVercel, color: "#e2e8f0" },
    ],
  },
];

const timeline = [
  {
    period: "2026 - 現在",
    title: "大学在学中(1年)",
    description:
      "プログラミングを学習中。Web を入り口に、セキュリティ・インフラ分野へ関心を広げている。",
  },
  {
    period: "2026.3",
    title: "高校卒業",
    description: "在学中にプログラミングに出会い、独学を始める。",
  },
];

export default function AboutPage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-5xl overflow-hidden px-4 pb-24 pt-32 sm:px-6">
      <div className="glow-blob -left-32 top-20 h-72 w-72 bg-accent" />
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-accent">
          WHO I AM
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          <span className="gradient-text">About</span>
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <section className="mt-8 max-w-2xl space-y-4 leading-relaxed text-muted">
          <p>
            大学1年生の student programmer です。Web
            フロントエンドを入り口にプログラミングを学びながら、このサイトのように「動くもの・触れるもの」を自分の手で形にする練習をしています。
          </p>
          <p>
            興味があるのはセキュリティとインフラの分野。学んだことは
            <a
              href="https://zenn.dev/t4kamuna"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 text-accent underline-offset-4 hover:underline"
            >
              Zenn
            </a>
            にたまに記事として書いています。
          </p>
        </section>
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <h2 className="text-xl font-bold">Skills</h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 120} className="flex">
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-mono text-sm text-accent">
                    {group.category}
                  </h3>
                  <span className="text-xs text-muted">{group.note}</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-4">
                  {group.items.map(({ name, Icon, color }) => (
                    <li
                      key={name}
                      className="group/skill flex w-16 flex-col items-center gap-1.5"
                    >
                      <Icon
                        size={30}
                        color={color}
                        title={name}
                        className="transition-transform duration-300 group-hover/skill:scale-125"
                      />
                      <span className="text-center text-[10px] leading-tight text-muted">
                        {name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <Reveal>
          <h2 className="text-xl font-bold">Timeline</h2>
        </Reveal>
        <ol className="mt-6 space-y-8 border-l border-white/10 pl-6">
          {timeline.map((entry, i) => (
            <li key={entry.period} className="relative">
              <span className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <Reveal delay={i * 120}>
                <p className="font-mono text-xs text-muted">{entry.period}</p>
                <h3 className="mt-1 font-bold">{entry.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
