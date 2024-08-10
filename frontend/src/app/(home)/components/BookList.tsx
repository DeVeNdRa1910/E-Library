'use client'
import BookCard from '@/components/BookCard'
import React from 'react' 
function BookList() {

  return (
    <div className='flex flex-wrap justify-evenly gap-4'>
      <BookCard title={"Moni Rooy"} description='Vary Hot' />
      <BookCard title={"Moni Rooy"} description='Vary Hot' image=''/>
      <BookCard title={"Moni Rooy"} description='Vary Hot' image=''/>
      <BookCard title={"Moni Rooy"} description='Vary Hot' image=''/>
    </div>
  )
}

export default BookList
