'use client'

import React, { useContext } from 'react'

import PhotoContextProvider from '@/context/PhotosContext'
import Single from '../components/Single'

const Photos = () => {
  return (
    <PhotoContextProvider>
      <div className="">
        <>
          <section className={''}>
            <Single />
          </section>
        </>
      </div>
    </PhotoContextProvider>
  )
}

export default Photos
