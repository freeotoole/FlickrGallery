'use client'

import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// import { Transition } from '@headlessui/react'

import { FlickrImageProps, PhotoContext } from '@/context/PhotosContext'
import GalleryGrid from './GalleryGrid'
import Image from './Image'
import Loading from './Loading'
import Carousel from './Swiper/Carousel'

interface GalleryProps {
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  columns?: number
  options?: any
  title?: string
  tags?: string
  subtitle?: string
}

const Gallery = (props: GalleryProps) => {
  const { images, loading, setLoading, getAllPhotos } = useContext(PhotoContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const [initialSlide, setInitialSlide] = React.useState(0)

  const openModal = (image: any, i: number) => {
    setIsOpen(true)
    setInitialSlide(i)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const searchParams = useSearchParams()

  const tag = searchParams.get('tag')
  // const filteredImages = images?.filter((image: FlickrImageProps) => {
  //   return image.tags.includes(tag ? tag : '')
  // })

  useEffect(() => {
    getAllPhotos &&
      (tag
        ? getAllPhotos({
            method: 'flickr.photosets.getPhotos',
            photoset_id: '72177720313681808',
          })
        : getAllPhotos())
  }, [getAllPhotos, tag, setLoading])

  return (
    <div className={`${loading ? 'opacity-30' : 'opacity-100'} transition`}>
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
          {!isOpen ? (
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
          ) : (
            <Carousel initialSlide={initialSlide} closeModal={closeModal}>
              {images?.map((image: FlickrImageProps, i: number) => (
                <div key={image.id} className="relative w-full">
                  <Image
                    className="mx-auto h-full max-h-screen"
                    alt={image.title}
                    title={image.title}
                    photoId={image.id}
                    lazy={i > 2 && true}
                  />
                  <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </div>
              ))}
            </Carousel>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Gallery
