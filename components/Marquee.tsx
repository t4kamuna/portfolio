// 流れるテキスト帯。track は同一内容の2コピーで、-50% 移動でシームレスにループする
export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee overflow-hidden border-y border-white/10 py-3.5">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-8 pr-8"
          >
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em] text-muted"
              >
                {item}
                <span className="text-accent" aria-hidden>
                  ●
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
