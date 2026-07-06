// =============================================================
// TODO: ここは後で実データを入れてください(全件サンプルです)
// title / description / tags / links を実際のプロジェクトに差し替え、
// featured: true のものが Home の「Featured Projects」に表示されます。
// =============================================================

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
    slug: "sample-project-1",
    title: "【サンプル】プロジェクト名 1",
    description:
      "【TODO: 実データに差し替え】どんな課題を、どんな技術で解決したかを2〜3行で。成果(ユーザー数・改善率など)があれば数字も。",
    tags: ["Next.js", "TypeScript"],
    year: "2026",
    githubUrl: "https://github.com/t4kamuna",
    demoUrl: undefined,
    featured: true,
  },
  {
    slug: "sample-project-2",
    title: "【サンプル】プロジェクト名 2",
    description:
      "【TODO: 実データに差し替え】プロジェクトの概要をここに記載してください。",
    tags: ["React", "Tailwind CSS"],
    year: "2025",
    githubUrl: "https://github.com/t4kamuna",
    demoUrl: undefined,
    featured: true,
  },
  {
    slug: "sample-project-3",
    title: "【サンプル】プロジェクト名 3",
    description:
      "【TODO: 実データに差し替え】プロジェクトの概要をここに記載してください。",
    tags: ["Python"],
    year: "2025",
    githubUrl: undefined,
    demoUrl: undefined,
    featured: false,
  },
];
