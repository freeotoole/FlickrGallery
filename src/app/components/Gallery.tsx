'use client'

import React, { useContext } from 'react'

import { FlickrImageProps, PhotoContext } from '@/context/PhotosContext'
import GalleryGrid from './GalleryGrid'
import Image from './Image'
import ImageModal from './ImageModal'
import Loading from './Loading'
import Single from './Single'

interface GalleryProps {
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  columns?: number
  options?: any
  title?: string
  subtitle?: string
}

const Gallery = (props: GalleryProps) => {
  const { images, loading, currentImage, setCurrentImage } =
    useContext(PhotoContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(0)
  const cols = props.columns || 3
  const gap = () => {
    switch (props.gap) {
      case 'sm':
        return 'grid-gap-sm'
      case 'md':
        return 'grid-gap-md'
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

  const openModal = (image: any, i: number) => {
    console.log(image)
    setIsOpen(true)
    setCurrentImage && setCurrentImage(image) // TODO: remove condition and fix type
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
      {images ? (
        <>
          <GalleryGrid columns={3} gap="sm">
            {images?.map((image: FlickrImageProps, i: number) => {
              return (
                <button key={i} onClick={() => openModal(image, i)}>
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
          </GalleryGrid>

          <ImageModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Single />
            {/* TODO: Build Carousel out in modal */}
          </ImageModal>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Gallery
