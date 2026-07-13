// プロジェクトの実データはまだ無いため空にしている。
// 最初のプロジェクトができたら、下のコメントの形式で追加してください。
// featured: true のものが Home の「Featured Projects」に表示され、
// 空の間は Home / Projects ページとも「Coming soon」表示になります。

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "yokomoji-kaigi",
    title: "横文字会議",
    description:
      "ビジネス横文字カードでコンボを繋ぎ、制限時間内の「合意形成」を目指すスコアアタックゲーム。NPC の発言や議題との文脈の噛み合いを判定する仕組みをインターフェースとして抽象化し、ルールベース判定から LLM 判定へ差し替え可能な設計にした。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    // TODO: リポジトリを公開したら githubUrl を追加
    githubUrl: undefined,
    demoUrl: "https://yokomoji-kaigi.vercel.app",
    featured: true,
  },
];
