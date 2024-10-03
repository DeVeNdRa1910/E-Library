import { z } from "zod";

export const bookSchema = z.object({
  title: z.string({ message: "Book title should be a string" }),
  description: z.string({ message: "Book description should be a string" }),
  author: z.string({ message: "Author should be a string" }),
  genre: z.string({ message: "Genre should be a string" }),
  coverImage: z.custom<FileList>((file) => file instanceof FileList, { message: "Book cover image should be a file list" })
    .refine((file) => file.length === 1, { message: "You must upload exactly one image" })
    .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file[0]?.type), { message: "Cover image must be a valid image format (jpeg, jpg or png)" }),
  
  file: z.custom<FileList>((file) => file instanceof FileList, { message: "Book file should be a file list" })
    .refine((file) => file.length === 1, { message: "You must upload exactly one PDF file" })
    .refine((file) => file[0]?.type === "application/pdf", { message: "File must be in PDF format" })
});
