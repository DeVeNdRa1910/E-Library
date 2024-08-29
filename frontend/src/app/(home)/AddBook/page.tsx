import React from 'react'

function AddBook() {
  return (
    <div 
      className='flex justify-center'
    >
     <form action=""
      className='min-h-[75vh] '
     >
      <div className='text-slate-600'>
        <label htmlFor="Book Titile: " className='text-white'>Book Title:</label>
        <input 
          type="text" 
          className='bg-transparent active:outline-none ml-4 py-1 px-4 border-b border-slate-600 text-orange-500'
          placeholder='Title'
        />
      </div>
      <div className='text-slate-600 flex py-2'>
        <label htmlFor="Book Titile: " className='text-white'>Description:</label>
        <textarea 
          rows={2}
          className='bg-transparent active:outline-none ml-4 py-1 px-4 border-b border-slate-600 text-orange-500'
          placeholder='Description'
        />
      </div>
      <div className='text-slate-600'>
        <label htmlFor="Book Titile: " className='text-white'>Genre:</label>
        <input 
          type="text" 
          className='bg-transparent active:outline-none ml-4 py-1 px-4 border-b border-slate-600 text-orange-500'
          placeholder='Genre'
        />
      </div>
      <div className='py-4'>
        <label htmlFor="Book Titile: ">Cover Image:</label>
        <input 
          type="file" 
          className='ml-4'
        />
      </div>
      <div className='pb-4'>
        <label htmlFor="Book Titile: ">Book File:</label>
        <input 
          type="file" 
          className='ml-4'
        />
      </div>
    </form> 
    </div>
  )
}

export default AddBook
