import { Github, ArrowUpRight } from "lucide-react";

// プロジェクトが空の間に表示するプレースホルダー
export default function ComingSoon() {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center sm:p-14">
      <p className="font-mono text-sm tracking-[0.3em] text-accent">
        COMING SOON
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
        最初のプロジェクトを製作中です。日々の活動は GitHub で見られます。
      </p>
      <a
        href="https://github.com/t4kamuna"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex items-center gap-2 text-sm text-accent"
      >
        <Github size={15} />
        github.com/t4kamuna
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}
