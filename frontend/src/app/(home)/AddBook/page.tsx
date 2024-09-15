"use client";

import React from "react";
import AddBookForm, { FormValuse } from "./components/add-book-form";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

function AddBook() {
  const { toast } = useToast();

  const getToken = () => {
    const token = localStorage.getItem("token") || ""
    console.log(token);
    return ; token
  };

  const formSubmitHandler = async (values: FormValuse) => {
    // console.log(values);
    console.log(typeof (values.coverImage as FileList)[0]);
    console.log((values.coverImage as FileList)[0]);
    

    const formData = {
      title: values.title,
      genre: values.genre,
      auther: values.auther,
      description: values.description,
      coverImage: (values.coverImage as FileList)[0],
      file: (values.file as FileList)[0],
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast({
        title: "Success.",
        description: "Book uploaded success fully",
      });
      console.log("Book created successfully:", response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error.",
        description: "Book Upload failed.",
      });
      console.error("Error creating book:", error);
    }
  };

  return (
    <div>
      <AddBookForm onSubmit={formSubmitHandler} />
    </div>
  );
}

export default AddBook;
