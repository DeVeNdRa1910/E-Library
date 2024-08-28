// export interface Book {

// }
//interface -> define the structure of object
// Both are same things
export type Book = {
  _id: string,
  title: string,
  description: string
  author: Author,
  coverImage: string,
  file: string,
  genre: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
}

export type Author = {
  _id: string,
  name: string
}

// known sa type alias

/* 
{
      _id: '66ceb3bd356faeaef386ff8e',
      title: 'Nagraj-5 nagraj and shango',
      author: '66cb4efd82031e779b181a42',
      coverImage: 'https://res.cloudinary.com/df5udpm1p/image/upload/v1724822456/book-covers/gwmiwurzw3ywmba57fj0.jpg',
      file: 'https://res.cloudinary.com/df5udpm1p/raw/upload/v1724822459/book-pdfs/qzcjuocgzvr2fxcwbyh5.pdf',   
      genre: 'fiction',
      createdAt: '2024-08-28T05:21:01.090Z',
      updatedAt: '2024-08-28T05:21:01.090Z',
      __v: 0
    }
*/