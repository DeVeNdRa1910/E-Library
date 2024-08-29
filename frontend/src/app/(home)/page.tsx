import Banner from "@/components/Banner";
import BookList from "./components/BookList";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[90vw] mx-auto relative">
      <Banner/>
      <Suspense fallback={'Loading...'}>
        {/* ab jab tak Booklist data fetch karke show nahi karega tab tak baki componenet jihe load hione me time nahi lgta vo to load ho hi jaynge , suspense ka use async componenet ko render kare me karte hai, suspense bala part page rendering ke doran rukega nahi */}
        <BookList />
      </Suspense>
      <div className="fixed right-5 bottom-5">
        <Link 
        href={'/AddBook'}
        className='bg-orange-500 text-white rounded-full py-0.5 px-3 text-4xl shadow-md shadow-white'
      >
        +
      </Link>
      </div>
    </div>
  );
}
