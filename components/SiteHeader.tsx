import Link from "next/link";
import JstClock from "@/components/JstClock";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          t4kamuna
        </Link>
        <div className="flex items-center gap-5 sm:gap-8">
          <nav className="flex items-center gap-5 text-sm text-muted sm:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* 幅が狭い画面ではナビを優先して時計は隠す */}
          <span className="hidden md:block">
            <JstClock />
          </span>
        </div>
      </div>
    </header>
  );
}
