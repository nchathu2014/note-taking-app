export function Header(){
    return(
        <nav className="bg-gray-50 shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 ">
            <h1 className=" text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Note Taking App 
            </h1>
            <span className="text-lg font-normal">(Built with Next.JS, MongoDB and TailwindCSS)</span>
          </div>
        </div>
      </nav>
    )
}