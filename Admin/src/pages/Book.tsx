import { getBooks } from "@/http/api";
import { useQuery } from "react-query";
import { MoreHorizontal, Loader } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { BookType } from "@/types";

function Book() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 60 * 60 * 1000, // time in miliseconds
  });

  // staleTime ka matlab apicall kitne time ke baad karvaani hai by default 0 hota hai (har render pr) hamne 1 hr diya hai, lekin real time data like chat app ke liye ye 0 hona chahiye

  const books = data?.data?.data || [];

  if (isError) {
    console.log(error);
    
    return <div>Error: Something went wrong</div>;
  }

  function deleteBookHandler(id: string) {
    alert(`Book Deleted ${id}`);
    
  }

  return (
    <div className="-mt-2 w-full">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Books</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to={'create/'}>
          <Button>Add Book</Button>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0" className="mt-4 w-full ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Books</CardTitle>
          <CardDescription>
            Manage your Books and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          {isLoading ? (
            <div className="min-h-[40vh]">
              <div className="flex justify-center items-center">
                <Loader className="animate-spin size-16" />
              </div>
            </div>
          ) : (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Genre</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book: BookType) => (
                  <TableRow key={book._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt={book.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={book.coverImage}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>
                      <Link
                        to={book.file}
                        target="_blank"
                        className="hover:shadow-lg active:shadow-md"
                      >
                        Read
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {book.genre}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {book.createdAt}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button variant={'destructive'} onClick={()=>{deleteBookHandler(book._id)}}>Delete</Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Book;
