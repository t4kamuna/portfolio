import type { Metadata } from "next";
import { Github, Twitter, BookOpen, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "t4kamuna への連絡先。",
};

// TODO: メールアドレスを公開してよいものに差し替えてください
const contacts = [
  {
    href: "mailto:your-email@example.com",
    label: "Email",
    detail: "【TODO: 公開用メールアドレスに差し替え】",
    Icon: Mail,
  },
  {
    href: "https://github.com/t4kamuna",
    label: "GitHub",
    detail: "@t4kamuna",
    Icon: Github,
  },
  {
    href: "https://zenn.dev/t4kamuna",
    label: "Zenn",
    detail: "@t4kamuna",
    Icon: BookOpen,
  },
  {
    href: "https://twitter.com/t4kamuna",
    label: "X (Twitter)",
    detail: "@t4kamuna",
    Icon: Twitter,
  },
];

export default function ContactPage() {
  return (
    <main className="relative mx-auto min-h-screen max-w-5xl overflow-hidden px-4 pb-24 pt-32 sm:px-6">
      <div className="glow-blob -right-32 top-20 h-72 w-72 bg-accent" />
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-accent">
          GET IN TOUCH
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          <span className="gradient-text">Contact</span>
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          お仕事のご相談・技術の話など、以下のいずれかからお気軽にご連絡ください。
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {contacts.map(({ href, label, detail, Icon }, i) => (
          <Reveal key={label} delay={(i % 2) * 120} className="flex">
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_40px_rgba(255,0,64,0.18)]"
            >
              <Icon
                size={22}
                className="shrink-0 text-accent transition-transform duration-300 group-hover:scale-125"
              />
              <div>
                <h2 className="font-bold">{label}</h2>
                <p className="mt-0.5 text-sm text-muted">{detail}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
