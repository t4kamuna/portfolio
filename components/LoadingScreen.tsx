"use client";

import { useEffect, useRef, useState } from "react";

// セッション初回のみ表示するローディング画面。
// 表示可否は layout.tsx の同期インラインスクリプトが描画前に
// html.show-loader で決めるため、チラつきが起きない。
//
// 演出: 画面全体に散った粒子が進捗に合わせて中心のリングへ収束し、
// 100% で外側へ弾けて消える(ヒーローの粒子演出への橋渡し)。
const DURATION = 2400;
const EXIT_DURATION = 700;
const PARTICLE_COUNT = 140;
const ACCENT = { r: 255, g: 0, b: 64 }; // #ff0040
const ACCENT_2 = { r: 124, g: 58, b: 237 }; // #7c3aed
const STATUSES = ["initializing particles", "composing interface", "ready"];

type LoaderParticle = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radiusFactor: number;
  alpha: number;
  color: string;
};

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // インラインスクリプトが「表示しない」と判定済みなら何もしない
    // (html.show-loader が無い間は CSS 側で display: none になっている)
    if (!document.documentElement.classList.contains("show-loader")) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // 画面のあちこちから中心リングへ集まってくる粒子
    const particles: LoaderParticle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => {
        const t = Math.random();
        const r = Math.round(ACCENT.r + (ACCENT_2.r - ACCENT.r) * t);
        const g = Math.round(ACCENT.g + (ACCENT_2.g - ACCENT.g) * t);
        const b = Math.round(ACCENT.b + (ACCENT_2.b - ACCENT.b) * t);
        return {
          x: width / 2 + (Math.random() - 0.5) * width,
          y: height / 2 + (Math.random() - 0.5) * height,
          angle: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.2,
          radiusFactor: 0.75 + Math.random() * 0.5,
          alpha: 0.35 + Math.random() * 0.65,
          color: `rgb(${r} ${g} ${b})`,
        };
      }
    );

    let animationId = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let finished = false;
    let leaveStart = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out で始め速く終わりゆっくり(実際の読み込みっぽい進み方)
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t >= 1 && !finished) {
        finished = true;
        leaveStart = now;
        setLeaving(true);
        exitTimer = setTimeout(() => {
          setDone(true);
          document.documentElement.classList.remove("show-loader");
          try {
            sessionStorage.setItem("t4-loaded", "1");
          } catch {
            // ストレージが使えない環境では毎回表示になるだけなので無視
          }
        }, EXIT_DURATION);
      }
      const leaveT = finished
        ? Math.min(1, (now - leaveStart) / EXIT_DURATION)
        : 0;

      // 完全にはクリアせず薄く塗り重ねて残像(トレイル)を出す
      context.fillStyle = "rgba(11, 14, 20, 0.3)";
      context.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      // 進捗とともにリングが締まり、退場時は外へ弾ける
      const baseRadius = Math.min(width, height) * (0.36 - 0.19 * eased);
      for (const p of particles) {
        const angle = p.angle + (now - start) * 0.0005 * p.speed;
        let radius = baseRadius * p.radiusFactor;
        if (finished) {
          radius += leaveT * leaveT * Math.min(width, height) * 0.9;
        }
        const targetX = centerX + Math.cos(angle) * radius;
        const targetY = centerY + Math.sin(angle) * radius;
        p.x += (targetX - p.x) * 0.07;
        p.y += (targetY - p.y) * 0.07;
        context.globalAlpha = p.alpha * (1 - leaveT);
        context.fillStyle = p.color;
        context.fillRect(p.x, p.y, 2, 2);
      }
      context.globalAlpha = 1;

      animationId = requestAnimationFrame(frame);
    };
    animationId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(exitTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (done) return null;

  const statusIndex = Math.min(
    STATUSES.length - 1,
    Math.floor((progress / 100) * STATUSES.length)
  );

  return (
    <div
      aria-hidden
      className={`loader fixed inset-0 z-[200] items-center justify-center bg-background transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className={`relative z-10 flex flex-col items-center gap-4 transition-transform duration-700 ${
          leaving ? "-translate-y-4" : ""
        }`}
      >
        <p className="gradient-text font-mono text-5xl font-bold tabular-nums">
          {progress}
          <span className="ml-1 text-2xl">%</span>
        </p>
        {/* 進捗に応じて1文字ずつ浮かび上がる */}
        <p className="font-mono text-sm tracking-[0.35em]">
          {"t4kamuna".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block transition-opacity duration-300"
              style={{ opacity: progress >= ((i + 1) / 8) * 100 ? 1 : 0.15 }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
      <p className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-muted">
        {STATUSES[statusIndex]}
        <span
          aria-hidden
          className="ml-1.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent"
          style={{ animation: "blink 1s step-end infinite" }}
        />
      </p>
    </div>
  );
}
