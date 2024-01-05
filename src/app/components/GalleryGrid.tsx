import { Fragment } from 'react'

import { FlickrImageProps } from '@/context/PhotosContext'

type GalleryGridProps = {
  children: React.ReactNode[]
  columns?: number
  gap?: 'sm' | 'md' | 'lg' | 'xl' // TODO: move to config
}

const GalleryGrid = (props: GalleryGridProps) => {
  const cols = props.columns || 3
  const gap = () => {
    switch (props.gap) {
      case 'sm':
        return 'grid-gap-sm'
      case 'md':
        return 'grid-gap'
      case 'lg':
        return 'grid-gap-lg'
      case 'xl':
        return 'grid-gap-xl'
      default:
        return 'grid-gap'
    }
  }

  const columns = props.children?.reduce((acc: any[], curr, i) => {
    const index = i % cols
    acc[index] = acc[index] || []
    acc[index].push(curr)
    return acc
  }, [])

  const gapStyles = {
    sm: 'grid-gap-sm',
    md: 'grid-gap',
    lg: 'grid-gap-lg',
    xl: 'grid-gap-xl',
  }
  const gridClasses = `grid ${
    gapStyles[props.gap || 'sm']
  } md:grid-cols-2 lg:grid-cols-${cols} justify-items-stretch w-full mb-20`
  return (
    <div className={gridClasses}>
      {columns?.map((column: React.ReactNode[], i: number) => (
        <div
          key={i}
          className={`relative flex flex-col ${gapStyles[props.gap || 'sm']}`}
        >
          {column.map((item: React.ReactNode, j: number) => (
            <Fragment key={i + j}>{item}</Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}

export default GalleryGrid
