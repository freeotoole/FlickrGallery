import React from 'react'

import PhotoContextProvider from '@/context/PhotosContext'
import Gallery from './components/Gallery'

export default function Home() {
  return (
    <PhotoContextProvider>
      <main className="w-full px-[var(--gutter)]">
        <Gallery
          gap="sm"
          columns={3}
          // title="Latest Photographs"
          // subtitle="8-bit gochujang photo booth gatekeep lomo, blog shoreditch tattooed. Celiac actually narwhal listicle, mukbang sus kinfolk pug banjo brunch."
        />
      </main>
    </PhotoContextProvider>
  )
}
