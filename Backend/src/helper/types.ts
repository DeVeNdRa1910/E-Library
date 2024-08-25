export interface User {
  _id: string,
  name: string,
  email: string,
  password: string
}


export interface Book {
  _id: string,
  title: string,
  author: User,
  genre: string,
  coverImage: string,
  file: string,
  createAt: Date,
  updatedAt: Date
}