export type BookType = {
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