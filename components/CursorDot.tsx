"use client";

import { useEffect, useRef } from "react";

// ドット+遅れて追従するリングのカスタムカーソル
// マウス環境(pointer: fine)かつモーション抑制でない場合のみ有効化する
export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduceMotion) return;

    document.documentElement.classList.add("cursor-dot-active");

    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;
    let animationId = 0;

    const handleMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      const target = e.target as Element | null;
      ring.classList.toggle(
        "cursor-ring-hover",
        !!target?.closest?.("a, button")
      );
    };
    const handleLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    // リングは lerp で遅れて追従させる
    const loop = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      animationId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("cursor-dot-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-accent opacity-0"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-white/30 opacity-0 transition-[width,height,border-color,opacity] duration-300"
      />
    </>
  );
}
