"use client";

import { useEffect, useState } from "react";

// ヘッダー右上に出す JST のリアルタイム時計(24時間表記・秒まで)
// SSR とのミスマッチを避けるため、マウントまではプレースホルダーを表示する
export default function JstClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-2 font-mono text-xs tabular-nums text-muted">
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
      />
      JST {time}
    </span>
  );
}
