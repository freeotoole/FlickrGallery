import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google' // Yanone_Kaffeesatz | Space_Grotesk

import Header from './components/Header'

import './globals.css'

const sans = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flickr Gallery',
  description: "by Free O'Toole",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} flex min-h-screen flex-col text-base transition-all `}
      >
        <Header />
        {children}
        <footer className="mt-auto flex w-full flex-col justify-between  bg-gray-200 px-[var(--gutter)] pb-3 pt-4 text-sm md:flex-row">
          {/* describe the project and technologies involved */}
          <p className="text-black">
            <span className="uppercase tracking-wide">Flickr Gallery</span> by{' '}
            <a
              className="underline hover:text-red-700"
              href="https://freeotoole.com"
              target="_blank"
            >
              Free O&apos;Toole
            </a>
          </p>
          <p className="text-gray-700">
            Built with <a href="https://nextjs.org">Next.js</a>,{' '}
            <a
              className="underline hover:text-black"
              href="https://tailwindcss.com"
            >
              Tailwind CSS
            </a>
            , and the{' '}
            <a
              className="underline hover:text-black"
              href="https://www.flickr.com/services/api"
            >
              Flickr API
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  )
}
