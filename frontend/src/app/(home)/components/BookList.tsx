
import BookCard from "@/components/BookCard";
import { Book } from "@/types";
import React from "react";
async function BookList() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/get-all-books`
  );
  if (!resp.ok) {
    throw new Error("An error occurred while fetching the books");
  }
  const respData = await resp.json();

  const bookData: Book[] = respData.data;

  // bookData ko ane me time lagega to ham baki component ko wait kyu karvaye

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto mb-6">
      {bookData.map((book: Book) => {
        return (
          <div key={book._id}>
            <BookCard book={book} />
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
