'use client'

import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export const PhotoContext = createContext<{
  images: FlickrImageProps[] | null
  loading: boolean
  getAllPhotos?: (query: string) => void
  getPhotos?: (options: any) => void
}>({ images: null, loading: false })

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
}

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

function PhotoContextProvider(props: PhotoContextProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const userId = process.env.NEXT_PUBLIC_USER_ID
  const [images, setImages] = useState<any[]>([])
  const [meta, setMeta] = useState<any>()
  const [loading, setLoading] = useState(true)

  const getAllPhotos = useCallback(
    (options?: any) => {
      axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=${userId}&extras=description&format=json&nojsoncallback=1&api_key=${apiKey}&per_page=24}`
        )
        .then((response) => {
          //   console.log(response);
          setImages(response.data.photos.photo)
          setMeta({
            page: response.data.photos.page,
            pages: response.data.photos.pages,
            perpage: response.data.photos.perpage,
            total: response.data.photos.total,
          })

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

  useEffect(() => {
    getAllPhotos()
  }, [getAllPhotos])

  return (
    <PhotoContext.Provider value={{ images, loading, getAllPhotos }}>
      {props.children}
    </PhotoContext.Provider>
  )
}

export default PhotoContextProvider
