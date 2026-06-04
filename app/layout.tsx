//meta情報の定義
import type { Metadata } from "next";
//フォントの読み込み
import { Geist, Geist_Mono } from "next/font/google";
//共通cssの読み込み
import "./globals.css";
//通常テキスト用フォント
const geistSans = Geist({
  //css変数として利用できるように変換
  variable: "--font-geist-sans",
  //英数字用フォントデータのみ取得して軽量化
  subsets: ["latin"],
});

//等幅フォント
const geistMono = Geist_Mono({
  //css変数
  variable: "--font-geist-mono",
  subsets: ["latin"],
  
});

//サイト全体のmeta情報
export const metadata: Metadata = {
  //タブの表示名
  title: "t4kamuna",
  //検索エンジンで表示される説明文
  description: "Welcome to t4kamuna's portfolio.",
  //ファビコン
    icons: {
    icon: "/favicon_circle_red.svg",
  },
  }

// 全ページ共有レイアウト
export default function RootLayout({
  children,
}: Readonly<{
  //各ページの中身がここに入る
  children: React.ReactNode;
}>) {
  return (
    //サイト全体の言語設定
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
