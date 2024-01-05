import React, { useEffect } from 'react'
// import required modules
import { EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './swiper-2.css'

type CarouselProps = {
  children: React.ReactNode[]
  type?: string
  options?: any
  initialSlide?: number
  closeModal?: () => void
}

const Carousel = ({
  children,
  type,
  options,
  initialSlide,
  closeModal,
}: CarouselProps) => {
  const defaultOptions = {
    centeredSlides: true,
    initialSlide: initialSlide,
    spaceBetween: 24,
    keyboard: true,
    lazy: true,
    mousewheel: true,
    slidesPerView: 'auto',
    // pagination: {
    //   clickable: true,
    // },
    navigation: true,
    modules: [EffectFade, Keyboard, Pagination, Navigation],
    // className: 'modal',
    className: 'carousel',
  }

  options = options || defaultOptions
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal && closeModal()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [closeModal])
  return (
    <div className="absolute inset-0 flex h-screen w-screen bg-gray-800 p-6 text-white">
      <div className="absolute right-0 top-0 z-10 flex justify-between px-10 py-4">
        <button onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </div>
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
