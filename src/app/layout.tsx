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
        <footer className="mt-auto flex w-full flex-col items-center justify-center bg-gray-200 pb-3 pt-4 text-sm text-gray-700">
          <p>
            Flickr Gallery by{' '}
            <a
              className="underline hover:text-black"
              href="https://freeotoole.com"
              target="_blank"
            >
              Free O&apos;Toole
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}
// px-4 md:px-8 lg:px-12 xl:px-24
