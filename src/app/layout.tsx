import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google' // Yanone_Kaffeesatz | Space_Grotesk

import Footer from './components/Footer'
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
        <Footer />
      </body>
    </html>
  )
}
