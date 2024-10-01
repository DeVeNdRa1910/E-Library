"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/Card";
import Link from "next/link";
import { Book } from "@/types";

function BookCard({ book }: { book: Book }) {


  return (
    <div>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <div className="flex items-center justify-between w-full">
            <div className="w-[40%] h-full">
              <CardItem translateZ="100" className="w-full">
                <Image
                  src={
                    book.coverImage ||
                    "https://www.news18.com/web-stories/celebrities/mouni-roy-flaunts-her-hot-swimwear/assets/4.jpeg"
                  }
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl object-top hover:scale-110 transition-all duration-200"
                  alt="thumbnail"
                />
              </CardItem>
            </div>
            <div className="w-[55%] h-full">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white line-clamp-2 text-balance"
              >
                {book.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {book.author ? book.author.name : "abc"}
              </CardItem>
              {/* card me description nahi likhna hai */}

              <div className="flex justify-between items-center mt-20">
                <Link
                  href={`/book/${book._id}`}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}

export default BookCard;
