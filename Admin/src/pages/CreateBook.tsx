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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bookSchema } from "@/lib/validators/bookChema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { createBooks } from "@/http/api";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type FormValuse = z.input<typeof bookSchema>;

function CreateBook() {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      genre: "",
      author: "",
      description: "",
    },
  });

  const coverImageRef = form.register("coverImage");
  const bookFileRef = form.register("file");
  const {toast} = useToast()

const mutation = useMutation({
    mutationKey: ['Create-Book'],
    mutationFn: (data: FormData) => createBooks(data),
    onSuccess: (resp: any) => {
      console.log("Book creation result", resp.data);
      toast({
        title: "Creating Book",
        description: resp.data.message
      })
    },
    onError: () => {
      //console.error("Error during creating book", error);
      toast({
        title: "Creating Book",
        description: "Failed"
      })
    }
  });

  const handleFormSubmit = (values: FormValuse) => {
    console.log(values);

    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("genre", values.genre);
    formData.append("author", values.author);
    formData.append("description", values.description);
    formData.append("coverImage", (values.coverImage as FileList)[0]);
    formData.append("bookFiles", (values.file as FileList)[0]);

    values.title=""

    console.log(formData);
    mutation.mutate(formData)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/books">Books</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Books</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3">
            <Button type="submit">
              {mutation.isLoading ? <Loader className="animate-spin" /> : <span>
                Submit</span>}
            </Button>
            <Button>Cancel</Button>
          </div>
        </div>
        <Card className="">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Create a new book
            </CardTitle>
            <CardDescription>
              Fill out the form below to create a new book.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      className="w-full"
                      placeholder="e.g. Title"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      className="w-full"
                      placeholder="e.g. Description"
                      rows={2}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input
                        id="genre"
                        className="w-full"
                        placeholder="e.g. Genre"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        id="author"
                        className="w-full"
                        placeholder="e.g. Author"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="coverImage"
                render={() => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        id="coverImage"
                        className="w-full"
                        type="file"
                        required
                        {...coverImageRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>Book File</FormLabel>
                    <FormControl>
                      <Input
                        id="file"
                        className="w-full"
                        type="file"
                        required
                        {...bookFileRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

export default CreateBook;
/* 
          <form>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  className="w-full"
                  placeholder="Book Title"
                  required
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-8">
                <div className="grid gap-3">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    type="text"
                    className="w-full"
                    placeholder="Book Genre"
                  required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    type="text"
                    className="w-full"
                    placeholder="Book Author"
                  required
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="This is great book"
                  className=""
                  required
                  rows={2}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-8">
                <div className="grid gap-3">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input
                    id="coverImage"
                    type="file"
                    className="w-full"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="bookFile">Book PDF</Label>
                  <Input
                    id="bookFile"
                    type="file"
                    className="w-full"
                    required
                  />
                </div>
              </div>
            </div>
          </form> 
          */
