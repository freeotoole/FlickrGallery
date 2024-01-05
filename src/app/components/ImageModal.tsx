import React, { useContext } from 'react'
import { Dialog } from '@headlessui/react'

import { FlickrImageProps, PhotoContext } from '@/context/PhotosContext'
import Image from './Image'

type ImageModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setNext?: (next: boolean) => void
  image?: FlickrImageProps | null
  children: React.ReactNode
}

function ImageModal({ image, isOpen, setIsOpen, children }: ImageModalProps) {
  // let [isOpen, setIsOpen] = useState(true)
  const { currentImage, setCurrentImage } = useContext(PhotoContext)
  // isOpen = true
  return (
    <Dialog
      className="relative z-50"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="relative my-20 bg-black text-white">
          <div className="flex justify-between px-6">
            <Dialog.Title>{currentImage?.title}</Dialog.Title>

            <button onClick={() => setIsOpen(false)}>x</button>
          </div>
          {/* <Dialog.Description>Image description</Dialog.Description> */}
          <div className="relative px-4 pb-4">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default ImageModal
