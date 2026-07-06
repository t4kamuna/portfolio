// ページ遷移のたびに再マウントされ、フェードイン演出をかける
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
