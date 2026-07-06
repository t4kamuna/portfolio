"use client";

import { useEffect, useRef } from "react";

// 文字を形成する粒子。scatter が 0 のとき base 位置(文字)、1 のとき scatter 位置(拡散)を目指す
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  scatterX: number;
  scatterY: number;
  color: string;
  size: number;
};

// 背景に漂う微光の粒子
type Drifter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
};

const ACCENT = { r: 255, g: 0, b: 64 }; // #ff0040
const ACCENT_2 = { r: 124, g: 58, b: 237 }; // #7c3aed
const REPEL_RADIUS = 90;

export default function ParticleField({ text = "t4kamuna" }: { text?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let drifters: Drifter[] = [];
    // 画面外に置いてロード直後の誤反発を防ぐ
    const pointer = { x: -9999, y: -9999 };
    // スクロール量に応じて 0(文字)→1(拡散)
    let scatter = 0;

    const setup = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;

      // まず CSS ピクセル解像度で文字を描き、ドット座標を抽出する
      canvas.width = width;
      canvas.height = height;

      // canvas の font は CSS 変数を解決しないため直接フォント名を指定する
      const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";
      // 仮サイズで実測し、画面幅の85%に収まるようスケールする
      context.font = `bold 100px ${fontFamily}`;
      const measured = context.measureText(text).width || 1;
      const fontSize = Math.min(140, ((width * 0.85) / measured) * 100);
      context.font = `bold ${fontSize}px ${fontFamily}`;
      context.fillStyle = "#fff";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, width / 2, height / 2);

      const imageData = context.getImageData(0, 0, width, height);
      const gap = width < 640 ? 4 : 6;

      particles = [];
      let minX = Infinity;
      let maxX = -Infinity;
      const positions: { x: number; y: number }[] = [];
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (imageData.data[(y * width + x) * 4 + 3] > 128) {
            positions.push({ x, y });
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
          }
        }
      }
      for (const pos of positions) {
        // 文字の左端→右端で赤→紫に補間
        const t = maxX > minX ? (pos.x - minX) / (maxX - minX) : 0;
        const r = Math.round(ACCENT.r + (ACCENT_2.r - ACCENT.r) * t);
        const g = Math.round(ACCENT.g + (ACCENT_2.g - ACCENT.g) * t);
        const b = Math.round(ACCENT.b + (ACCENT_2.b - ACCENT.b) * t);
        particles.push({
          x: pos.x,
          y: pos.y,
          vx: 0,
          vy: 0,
          baseX: pos.x,
          baseY: pos.y,
          scatterX: pos.x + (Math.random() - 0.5) * width * 0.9,
          scatterY: pos.y - Math.random() * height * 0.7,
          color: `rgb(${r} ${g} ${b})`,
          size: gap <= 4 ? 1.5 : 2,
        });
      }

      drifters = Array.from(
        { length: Math.floor((width * height) / 22000) },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          alpha: 0.08 + Math.random() * 0.22,
        })
      );

      // 抽出が終わったら高 DPI 解像度に切り替えて描画する
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      context.fillStyle = "#e2e8f0";
      for (const d of drifters) {
        d.x = (d.x + d.vx + width) % width;
        d.y = (d.y + d.vy + height) % height;
        context.globalAlpha = d.alpha;
        context.fillRect(d.x, d.y, 1.5, 1.5);
      }

      for (const p of particles) {
        const targetX = p.baseX + (p.scatterX - p.baseX) * scatter;
        const targetY = p.baseY + (p.scatterY - p.baseY) * scatter;

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < REPEL_RADIUS * REPEL_RADIUS) {
          const dist = Math.sqrt(dist2) || 1;
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx -= (dx / dist) * force * 2.4;
          p.vy -= (dy / dist) * force * 2.4;
        }

        p.vx += (targetX - p.x) * 0.045;
        p.vy += (targetY - p.y) * 0.045;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;

        context.globalAlpha = 1 - scatter * 0.9;
        context.fillStyle = p.color;
        context.fillRect(p.x, p.y, p.size, p.size);
      }
      context.globalAlpha = 1;
    };

    const animate = () => {
      drawFrame();
      animationId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const handleScroll = () => {
      scatter = Math.min(1, Math.max(0, window.scrollY / (height * 0.7)));
    };
    // window の resize ではなく canvas 自体のサイズ変化を監視する
    // (モバイルのアドレスバー伸縮や回転でも正しく再計算される)
    const resizeObserver = new ResizeObserver(() => {
      if (canvas.clientWidth !== width || canvas.clientHeight !== height) {
        setup();
        if (reduceMotion) drawFrame();
      }
    });
    resizeObserver.observe(canvas);

    setup();

    if (reduceMotion) {
      // モーション抑制時は文字を静的に一度だけ描画する
      drawFrame();
    } else {
      animate();
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerout", handlePointerLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [text]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
