const Header = () => {
  return (
    <header className="flex w-full items-center gap-10 px-[var(--gutter)] pb-3 pt-4 text-left">
      <h1 className="text-base font-light uppercase tracking-widest ">
        <a href="/">Free&apos;s photos</a>
      </h1>
      <nav className="ml-auto flex items-center gap-4 text-sm uppercase tracking-wider text-gray-600">
        <a href="/" className="hover:underline">
          All
        </a>
        <a href="/?tag=film" className="hover:underline">
          Film
        </a>
      </nav>
    </header>
  )
}

export default Header
