import { Github, Twitter, BookOpen } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/t4kamuna", label: "GitHub", Icon: Github },
  { href: "https://zenn.dev/t4kamuna", label: "Zenn", Icon: BookOpen },
  { href: "https://twitter.com/t4kamuna", label: "X (Twitter)", Icon: Twitter },
];

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-white/5">
      {/* 大型ウォーターマーク。ホバーした文字だけ浮かび上がる */}
      <div
        aria-hidden
        className="select-none px-4 pt-10 text-center font-mono text-[13vw] font-bold leading-none tracking-tight text-white/[0.05] sm:px-6"
      >
        {"t4kamuna".split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-colors duration-500 hover:text-accent/60"
          >
            {char}
          </span>
        ))}
      </div>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} t4kamuna
        </p>
        <div className="flex gap-6 text-muted">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition hover:text-foreground"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
