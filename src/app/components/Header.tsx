'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Header = () => {
  // const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <header className="flex w-full items-center gap-10 px-[var(--gutter)] pb-3 pt-4 text-left">
      <h1 className="text-base font-light uppercase tracking-widest ">
        <a href="/">Free&apos;s photos</a>
      </h1>
      <nav className="ml-auto flex items-center gap-4 text-sm uppercase tracking-wider text-gray-600">
        <Link
          href="/"
          className={`hover:underline ${
            searchParams.get('tag') ? '' : 'font-bold text-black underline'
          }`}
        >
          All
        </Link>
        <Link
          href="/?tag=film"
          className={`hover:underline ${
            searchParams.get('tag') ? 'font-bold text-black underline' : ''
          }`}
        >
          Film
        </Link>
      </nav>
    </header>
  )
}

export default Header
