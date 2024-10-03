import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Book } from "@/types";
import DownloadButton from "./components/DownloadButton";
import Link from "next/link";
import DeleteButton from "./components/DeleteButton";
import BookPage from "./components/BookPage";
import { getCookie } from "cookies-next";


async function SingleBookPage({ params }: { params: { bookId: string } }) {
  // console.log('params', params);
  let book: Book | null = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/get-book/${params.bookId}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error fetching book");
    }
    const bookResp = await response.json();
    book = bookResp.data;
  } catch (err: any) {
    throw new Error("Error fetching book");
  }

  if (!book) {
    throw new Error("Book not found");
  }

  return (
    <div >
      <BookPage book={book} />
    </div>
  );
}

export default SingleBookPage;
