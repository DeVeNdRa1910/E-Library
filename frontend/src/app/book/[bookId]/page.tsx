import React from "react";
import Image from "next/image";
import { Book } from "@/types";
import DownloadButton from "./components/DownloadButton";
import Link from "next/link";
import DeleteButton from "./components/DeleteButton";

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
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
        <span className="font-semibold">by {book.author.name}</span>
        <p className="mt-5 text-lg leading-8">{book.description}</p>
        <DownloadButton fileLink={book.file} />
        {/* creating another client component and import in this server component 
                onClick is function of client component
                */}
        <div className="flex justify-start py-3">
          <Link
            href={book.file}
            className="w-[40%] text-center hover:text-orange-500 transition-all border rounded-lg p-2"
          >
            Read now →
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <Image
          src={book.coverImage}
          alt={book.title}
          className="rounded-md border"
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />
        <div className="w-full my-4">
          <Link
            href={'/EditBook'}
            className="w-full text-center hover:text-orange-500 transition-all border rounded-lg p-2 my-4"
          >
            Edit
          </Link>
          <DeleteButton />
        </div>
      </div>
    </div>
  );
}

export default SingleBookPage;
