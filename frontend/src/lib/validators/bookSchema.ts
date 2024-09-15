import { z } from "zod";

export const isServer = ( typeof window === 'undefined' );

export const bookSchema = z.object({
  title: z.string({message: "Book title should be a String"}),
  description: z.string({message: "Book title should be a String"}),
  author: z.string({message: "Author should be a string"}),
  genre: z.string({message: "Genre should be a string"}),
  coverImage: z.instanceof(isServer ? File : FileList, { message: 'Book cover image should be a image' }),
  file: z.instanceof(isServer ? File : FileList, { message: 'Book file should be a PDF file' })
})