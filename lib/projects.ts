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
  // {
  //   slug: "my-first-project",
  //   title: "プロジェクト名",
  //   description:
  //     "どんな課題を、どんな技術で解決したかを2〜3行で。成果があれば数字も。",
  //   tags: ["Next.js", "TypeScript"],
  //   year: "2026",
  //   githubUrl: "https://github.com/t4kamuna/xxx",
  //   demoUrl: "https://xxx.vercel.app",
  //   featured: true,
  // },
];
