export function Header() {
  return (
    <nav className="bg-gray-50 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center p-3">
          <h1 className="text-2xl md:text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Note Taking App
          </h1>
          <span className="text-md md:text-lg font-normal">
            Built with Next.JS, MongoDB, TailwindCSS & More...
          </span>
        </div>
      </div>
    </nav>
  );
}
