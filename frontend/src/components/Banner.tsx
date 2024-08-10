
import React from "react";
import Image from "next/image";
import bookbg from "../../public/bookBanner.jpg";
import { BackgroundGradient } from "./ui/BackgroundDradient";

function Banner() {
  return (
    <div className="relative h-[35vh] w-[70vw] mx-auto p-2 mb-10">
      <BackgroundGradient>
        <Image
          src={bookbg}
          alt="Banner"
          className="h-[35vh] w-[70vw] object-cover object-left-bottom rounded-3xl mx-auto p-0.5"
        />
      </BackgroundGradient>
      <h2 className="absolute top-1/2 left-[25%]  z-10 -translate-y-1/2  text-5xl tracking-tight line-clamp-2 font-medium text-amber-900 font-serif uppercase">
        Connect, Share and Trade your Favourite Reads...
      </h2>
    </div>
  );
}

export default Banner;
