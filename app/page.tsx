"use client";
//ReactのライフサイクルとCanvas参照に使用
import { useEffect, useRef, useState } from "react";
//nextjsのページ遷移用リンク
import Link from "next/link";
//snsアイコン
import { Github, Twitter, BookOpen } from "lucide-react";


export default function Home() {
  //canvas要素を参照するためのRef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  //カーソル
  const [cursor, setCursor] = useState({x:0, y:0});
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);



  useEffect(() => {
    //canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    // 2D描画コンテキスト
    const context = canvas.getContext("2d");
    if (!context) return;
    //アニメーション管理
    let animationId: number;
    //マウス位置
    const mouse = { x: 0, y: 0 };
    //ドット情報
    let dots: { x: number; y: number; baseX: number; baseY: number }[] = [];
    //描画する文字とサイズ
    const text = "t4kamuna";
    const fontSize = 140;
    //画面サイズ取得→文字描画→文字をどっと変換
    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.font = `bold ${fontSize}px sans-serif`;
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      //ドットサイズ
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      dots = [];

      for (let y = 0; y < canvas.height; y += 6) {
        for (let x = 0; x < canvas.width; x += 6) {
          const index = (y * canvas.width + x) * 4;
          if (imageData.data[index + 3] > 128) {
            dots.push({ x, y, baseX: x, baseY: y });
          }
        }
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  setCursor({ x: e.clientX, y: e.clientY });

  const id = Date.now();

  setTrail((prev) => [
    ...prev.slice(-20),
    { x: e.clientX, y: e.clientY, id },
  ]);

  setTimeout(() => {
    setTrail((prev) => prev.filter((point) => point.id !== id));
  }, 500);
};

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          dot.x -= dx * 0.05;
          dot.y -= dy * 0.05;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.05;
          dot.y += (dot.baseY - dot.y) * 0.05;
        }
       //ドット文字の色
        context.fillStyle = "#ffffff";
        context.fillRect(dot.x, dot.y, 2, 2);
      });

      animationId = requestAnimationFrame(animate);
    };

    setupCanvas();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", setupCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setupCanvas);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#000000] text-[#252020] overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Left Navigation */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 text-gray-400 text-sm">
        <Link href="/projects" className="hover:text-white transition">
          Projects
        </Link>
        <Link href="/contact" className="hover:text-white transition">
          Contact
        </Link>
      </div>

      {/* Top Right Icons */}
      <div className="absolute top-8 right-10 flex gap-6 text-gray-400">
        <a
          href="https://github.com/t4kamuna"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <Github size={20} />
        </a>

        <a
          href="https://zenn.dev/t4kamuna"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <BookOpen size={20} />
        </a>

        <a
          href="https://twitter.com/t4kamuna"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <Twitter size={20} />
        </a>
      </div>
    </main>
  );
}