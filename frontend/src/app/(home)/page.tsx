import Banner from "@/components/Banner";
import BookList from "./components/BookList";

export default function Home() {
  return (
    <div className="w-[90vw] mx-auto">
      <Banner/>
      <BookList />
      <div className="flex flex-wrap justify-evenly gap-4">
        Hello
      </div>
    </div>
  );
}
