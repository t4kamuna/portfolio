import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "t4kamuna の経歴・スキル。",
};

// TODO: ここは後で実データを入れてください(スキル・経歴ともサンプルです)
const skills = [
  { category: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["【TODO: 例 Node.js / Go など】"] },
  { category: "Tools", items: ["【TODO: 例 Docker / AWS など】"] },
];

const timeline = [
  {
    period: "20XX - 現在",
    title: "【TODO: 所属・役職】",
    description: "【TODO: 何をしているかを1〜2行で】",
  },
  {
    period: "20XX - 20XX",
    title: "【TODO: 学歴や前職など】",
    description: "【TODO: 概要を1〜2行で】",
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
            【TODO: 実データに差し替え】自己紹介の本文。どんな経緯でエンジニアになり、何が得意で、どんな価値を出せるか。
          </p>
          <p>
            【TODO: 実データに差し替え】趣味・関心・活動(登壇、記事執筆、OSSなど)があればここに。
          </p>
        </section>
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <h2 className="text-xl font-bold">Skills</h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {skills.map((skill, i) => (
            <Reveal key={skill.category} delay={i * 120} className="flex">
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/40">
                <h3 className="font-mono text-sm text-accent">
                  {skill.category}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
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
