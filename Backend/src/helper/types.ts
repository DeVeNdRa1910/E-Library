export interface User {
  _id: string,
  name: string,
  email: string,
  password: string,
  role: string
}


export interface Book {
  _id: string,
  title: string,
  description: string,
  author: User,
  genre: string,
  coverImage: string,
  file: string,
  createAt: Date,
  updatedAt: Date
}