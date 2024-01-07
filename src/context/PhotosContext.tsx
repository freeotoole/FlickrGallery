'use client'

import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export const PhotoContext = createContext<{
  images: FlickrImageProps[] | null
  loading: boolean
  currentImage: any
  setLoading?: (image: any) => void
  getAllPhotos?: (options?: any) => void
  getPhotos?: (options: any) => void
}>({ images: null, loading: false, currentImage: null })

interface PhotoContextProviderProps {
  children: React.ReactNode
}

export type FlickrImageProps = {
  id: string
  owner: string
  secret: string
  server: string
  farm: number
  title: string
  ispublic: number
  isfriend: number
  isfamily: number
  description: {
    _content: string
  }
  tags: string
}

function PhotoContextProvider(props: PhotoContextProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const userId = process.env.NEXT_PUBLIC_USER_ID
  const [images, setImages] = useState<any[]>([])
  const [meta, setMeta] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState<any>(null)
  const FlickrUrl = 'https://www.flickr.com/services/rest/'

  const getAllPhotos = useCallback(
    (options?: any) => {
      setLoading(true)

      const defaultOptions = {
        method: 'flickr.people.getPublicPhotos',
        user_id: userId,
        extras: 'description,tags',
        format: 'json',
        nojsoncallback: 1,
        api_key: apiKey,
        page: 1,
        per_page: 24,
      }
      options = { ...defaultOptions, ...options }
      const queryParams = Object.keys(options)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`
        )
        .join('&')
      axios
        .get(`${FlickrUrl}?${queryParams}`)
        .then((response) => {
          setImages(
            response.data.photos?.photo || response.data.photoset?.photo
          )
          // setMeta({
          //   page: response.data.photos.page,
          //   pages: response.data.photos.pages,
          //   perpage: response.data.photos.perpage,
          //   total: response.data.photos.total,
          // })

          setLoading(false)
        })
        .catch((error) => {
          console.log(
            'Encountered an error with fetching and parsing data',
            error
          )
        })
    },
    [apiKey, userId]
  )

  return (
    <PhotoContext.Provider
      value={{ images, loading, currentImage, setLoading, getAllPhotos }}
    >
      {props.children}
    </PhotoContext.Provider>
  )
}

export default PhotoContextProvider

/**
 * PROPS FOR REQUEST
 * safe_search (optional) [only if auth set up]
 *  - 1 for safe, 2 for moderate, 3 for restricted
 * content_type (optional)
 *  - 0 for photos only (default), 1 for screenshots only, 2 for 'other' only, 3 for virtual photos only
 * extras (optional)
 *  - description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o
 * per_page (optional)
 * page (optional)
 */

/**
 * FUTURE FEATURES
 * Tags - add options to filter by tags built from options list
 */
