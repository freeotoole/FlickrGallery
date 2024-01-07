import { createContext } from 'react'
import useSWR from 'swr'

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

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const userId = process.env.NEXT_PUBLIC_USER_ID

// Define the API endpoint for fetching photos
const API_ENDPOINT = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=${userId}&extras=description,tags&format=json&nojsoncallback=1&api_key=${apiKey}&per_page=24}`

// Create a new context for the photo content
export const FlickrContext = createContext([])

// Create a custom hook to fetch the photos using SWR
export const usePhotos = () => {
  const { data, error } = useSWR(API_ENDPOINT)

  // Return the photos and error, if any
  return {
    photos: data?.photos?.photo || [],
    error,
  }
}

// Create a provider component to wrap your app with the photo content
export const PhotosProvider: React.FC = ({ children }: any) => {
  const { photos, error } = usePhotos()

  // Render the children with the photo content as the value of the context
  return (
    <FlickrContext.Provider value={photos}>
      {error ? 'Error fetching photos' : children}
    </FlickrContext.Provider>
  )
}
