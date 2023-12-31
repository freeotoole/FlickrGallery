import { Dialog } from '@headlessui/react'

import { FlickrImageProps } from '@/context/PhotosContext'
import Image from './Image'

type ImageModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  image: FlickrImageProps | null
}

function ImageModal({ image, isOpen, setIsOpen }: ImageModalProps) {
  // let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog
      className="relative z-50"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="relative my-20 bg-white">
          <div className="flex justify-between px-6">
            <Dialog.Title>Image title</Dialog.Title>
            <button onClick={() => setIsOpen(false)}>x</button>
          </div>
          {/* <Dialog.Description>Image description</Dialog.Description> */}
          <div className="relative">
            {image && (
              <Image
                className="h-auto max-h-[80vh] w-full max-w-[90vw]"
                alt={image.title}
                title={image.title}
                photoId={image.id}
              />
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default ImageModal
