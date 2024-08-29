import Banner from "@/components/Banner";
import BookList from "./components/BookList";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-[90vw] mx-auto">
      <Banner/>
      <Suspense fallback={'Loading...'}>
        {/* ab jab tak Booklist data fetch karke show nahi karega tab tak baki componenet jihe load hione me time nahi lgta vo to load ho hi jaynge , suspense ka use async componenet ko render kare me karte hai, suspense bala part page rendering ke doran rukega nahi */}
        <BookList />
      </Suspense>
      <div className="flex flex-wrap justify-evenly gap-4">
        Hello
      </div>
    </div>
  );
}
