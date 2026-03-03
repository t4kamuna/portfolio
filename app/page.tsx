export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-3xl px-6">
        <h1 className="text-6xl font-semibold tracking-tight">
          t4kamuna
        </h1>

        <p className="mt-6 text-xl text-gray-400 leading-relaxed">
          I design systems.
          <br />
          I build automation.
          <br />
          I ship ideas.
        </p>

        <div className="mt-10 flex gap-6 text-sm text-gray-500">
          <a
            href="https://github.com/t4kamuna"
            target="_blank"
            className="hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href="/projects"
            className="hover:text-white transition"
          >
            Projects
          </a>

          <a
            href="/now"
            className="hover:text-white transition"
          >
            Now
          </a>
        </div>
      </div>
    </main>
  );
}