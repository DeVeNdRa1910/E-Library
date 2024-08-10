import React from 'react'
import Image from 'next/image'
import bookbg from '../../public/bookBanner.jpg'

function Banner() {
  return (
    <div>
      <div className='relative'>
        <Image 
          src={bookbg}
          alt='Banner'
          className='h-[40vh] w-[70vw] object-cover object-left-bottom rounded-lg mx-auto'
        />
        <h2
          className='absolute top-1/2 -translate-y-1/2 left-[35vw] right-[18vw] text-5xl tracking-tighter line-clamp-2 font-medium text-amber-900 font-serif uppercase'
        >Connect, Share and Trade your Favourite Reads...</h2>
      </div>
        
    </div>
  )
}

export default Banner