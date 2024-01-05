import React from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './swiper.css'

// import required modules
import { EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type CarouselProps = {
  children: React.ReactNode[]
  type?: string
  options?: any
}

const Carousel = ({ children, type, options }: CarouselProps) => {
  const defaultOptions = {
    centeredSlides: true,
    spaceBetween: 24,
    keyboard: true,
    lazy: true,
    mousewheel: true,
    slidesPerView: 'auto',
    pagination: {
      clickable: true,
    },
    navigation: true,
    modules: [EffectFade, Keyboard, Pagination, Navigation],
    // className: 'modal',
    className: 'carousel',
  }

  options = options || defaultOptions

  return (
    <div>
      {children && (
        <Swiper {...options}>
          {/* <Slides /> */}
          {children.map((child: any, i: number) => (
            <SwiperSlide key={i} className="">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default Carousel
