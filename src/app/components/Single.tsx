'use client'

import React, { useContext, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { FlickrImageProps, PhotoContext } from '@/context/PhotosContext'
import Image from './Image'
import Loading from './Loading'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

import Carousel from './Swiper/Carousel'

const Single = () => {
  const { images, loading } = useContext(PhotoContext)
  // const [selectedImage, setSelectedImage] = React.useState(null)
  // console.log('selectedImage', selectedImage)

  return (
    <div className="w-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="mb-20">
          {images && (
            <Carousel>
              {images?.map((image: FlickrImageProps, i: number) => (
                <div key={image.id}>
                  <Image
                    className=""
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
        </div>
      )}
    </div>
  )
}

export default Single
