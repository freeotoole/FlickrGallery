import { useEffect, useState } from 'react'
import axios from 'axios'

import Loading from './Loading'

export type ImageProps = {
  photoId: string
  alt: string
  title: string
  className?: string
  hover?: boolean
  lazy?: boolean
}

type Size = {
  label:
    | 'Square' // 75x75
    | 'Large Square' // 150x150
    | 'Thumbnail' // 100 on longest side
    | 'Small' // 240 on longest side
    | 'Small 320' // 320 on longest side
    | 'Medium' // 500 on longest side
    | 'Medium 640' // 640 on longest side
    | 'Medium 800' // 800 on longest side
    | 'Large' // 1024 on longest side
    | 'Large 1600' // 1600 on longest side
    | 'Large 2048' // 2048 on longest side
    | 'Original' // original dimensions
  width: number
  height: number
  source: string
  url: string
  media: string
}

const Image = (props: ImageProps) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const [sizes, setSizes] = useState<Size[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${props.photoId}&format=json&nojsoncallback=1`
      )
      .then((response) => {
        setSizes(response.data.sizes.size)
        setLoading(false)
      })
      .catch((error) => {
        console.log(
          'Encountered an error with fetching and parsing data',
          error
        )
      })
  }, [props.photoId, apiKey])

  const getSrc = (label: string) => {
    /**
     * Options: Square, Large Square, Thumbnail, Small, Small 320, Medium, Medium 640, Medium 800, Large, Large 1600, Large 2048, Original
     *
     */
    // TODO: Add error handling
    const imgSize = sizes?.find((size: Size) => size.label === label)
    // return sizes?.find((size: Size) => size.label === label).source;
    return {
      src: imgSize?.source,
      width: imgSize?.width,
      height: imgSize?.height,
      aspect:
        imgSize && imgSize?.width > imgSize?.height
          ? 'aspect-[3/2]'
          : 'aspect-[2/3]',
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex aspect-[3/2] w-full flex-1 items-center justify-center">
          {/* <Loading /> */}
        </div>
      ) : (
        <figure
          className={`${props.className} ${
            getSrc('Large').aspect
          } group relative overflow-hidden`}
        >
          <img
            loading={props.lazy ? 'lazy' : 'eager'}
            srcSet={`${getSrc('Large')?.src} 1024w, ${getSrc('Medium')
              ?.src} 640w, ${getSrc('Small')?.src} 320w`}
            src={getSrc('Thumbnail')?.src}
            alt={props.alt}
            className={`block ${
              getSrc('Large').aspect
            } h-full w-full max-w-none object-cover object-center  ${
              props.hover
                ? 'transition-transform duration-700 group-hover:scale-125'
                : ''
            }`}
          />
          {props.hover && (
            <figcaption
              aria-hidden="true"
              className=" absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 p-6 text-white opacity-0 transition duration-500 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye text-lg"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
              <span className="text-sm uppercase ">{props.title}</span>
            </figcaption>
          )}
        </figure>
      )}
    </>
  )
}

export default Image
