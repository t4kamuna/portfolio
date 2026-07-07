import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CursorDot from "@/components/CursorDot";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = "https://t4kamuna.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "t4kamuna",
    template: "%s | t4kamuna",
  },
  description:
    "t4kamuna のポートフォリオ。制作物・技術記事・経歴のアーカイブ。",
  icons: {
    icon: "/favicon_circle_red.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "t4kamuna",
    title: "t4kamuna",
    description:
      "t4kamuna のポートフォリオ。制作物・技術記事・経歴のアーカイブ。",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@t4kamuna",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // インラインスクリプトが html に .js を足すため、その属性差分の警告のみ抑制する
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}
      >
        {/* パース時に同期実行され、初回描画前にクラスを付与する:
            .js = リビール対象を隠すのは JS が確実に動く場合のみ
            .show-loader = ローディング画面はセッション初回かつモーション許可時のみ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");try{if(!sessionStorage.getItem("t4-loaded")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("show-loader")}}catch(e){}`,
          }}
        />
        <LoadingScreen />
        <ScrollProgress />
        <CursorDot />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
