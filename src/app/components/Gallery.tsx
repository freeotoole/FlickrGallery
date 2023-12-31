'use client'

import React, { useContext } from 'react'

import { FlickrImageProps, PhotoContext } from '@/context/PhotosContext'
import Image from './Image'
import ImageModal from './ImageModal'
import Loading from './Loading'

interface GalleryProps {
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  columns?: number
  options?: any
  title?: string
  subtitle?: string
}

const Gallery = (props: GalleryProps) => {
  const { images, loading } = useContext(PhotoContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(null)
  const cols = props.columns || 3
  const gap = () => {
    switch (props.gap) {
      case 'sm':
        return 'grid-gap-sm'
      case 'md':
        return 'grid-gap'
      case 'lg':
        return 'grid-gap-lg'
      case 'xl':
        return 'grid-gap-xl'
      default:
        return 'grid-gap'
    }
  }

  const imageColumns = images?.reduce((acc: any[], curr, i) => {
    const index = i % cols
    acc[index] = acc[index] || []
    acc[index].push(curr)
    return acc
  }, [])

  const gridClasses = `grid ${gap()} md:grid-cols-2 lg:grid-cols-${cols} justify-items-stretch w-full mb-20`

  const openModal = (image: any) => {
    console.log(image)
    setIsOpen(true)
    setSelectedImage(image)
  }

  return (
    <div>
      {props.title && (
        <h2 className="max-w-4xl text-xl tracking-wider">{props.title}</h2>
      )}
      {props.subtitle && (
        <h3 className="mb-6 max-w-4xl text-base font-thin tracking-wider">
          {props.subtitle}
        </h3>
      )}
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className={gridClasses}>
            {imageColumns?.map((column, i) => {
              return (
                <div key={i} className={`relative flex flex-col ${gap()}`}>
                  {column?.map((image: FlickrImageProps, i: number) => {
                    return (
                      <button key={i} onClick={() => openModal(image)}>
                        <Image
                          hover
                          className="h-auto w-full"
                          alt={image.title}
                          title={image.title}
                          photoId={image.id}
                        />
                      </button>
                    )
                  })}
                </div>
              )
            })}
            {/* {images?.map((image, i) => {
              return (
                <article key={i}>
                  <Image
                    className="w-full h-auto"
                    alt={image.title}
                    title={image.title}
                    photoId={image.id}
                  />
                </article>
              );
            })} */}
          </section>
          <ImageModal
            image={selectedImage}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      )}
    </div>
  )
}

export default Gallery
