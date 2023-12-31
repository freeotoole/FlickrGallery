const Header = () => {
  return (
    <header className="flex w-full items-center gap-10 px-[var(--gutter)] pb-3 pt-4 text-left">
      <h1 className="text-base font-light uppercase tracking-widest ">
        <a href="/">Free O&apos;Toole</a>
      </h1>
      <a
        href="/photos"
        className="text-sm text-gray-500 no-underline hover:underline"
      >
        big slider version
      </a>
    </header>
  )
}

export default Header
