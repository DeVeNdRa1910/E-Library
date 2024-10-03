'use client'

import { Book } from '@/types';
import React, { useEffect, useState } from 'react'
import DownloadButton from './DownloadButton';
import Link from 'next/link';
import Image from 'next/image';

function BookPage({ book }: { book: Book }) {
  const [token, setToken] = useState<string | null>(null);

  console.log(book);
  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10" >
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
        <span className="font-semibold">by {book.author?.name}</span>
        <p className="mt-5 text-lg leading-8">{book.description}</p>
        {token ? <DownloadButton fileLink={book.file} /> : <span>For Read or download the Book you have to <Link className='hover:text-orange-500' href={"/signin"}>Sign-In</Link></span>}
        {/* creating another client component and import in this server component 
                onClick is function of client component
                */}
        <div className="flex justify-start py-3">
          {
            token && <Link
            href={book.file}
            className="w-[40%] text-center hover:text-orange-500 transition-all border rounded-lg p-2"
          >
            Read now →
          </Link>
          }
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
      </div>
    </div>
  );
}

export default BookPage