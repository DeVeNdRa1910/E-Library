"use client";

import React, { useState } from "react";
import AddBookForm, { FormValuse } from "./components/add-book-form";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

function AddBook() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const formSubmitHandler = async (values: FormValuse) => {
    // console.log(values);
    // console.log(typeof (values.coverImage as FileList)[0]);
    // console.log("Cover Image Object",(values.coverImage as FileList)[0]);
    
    

    const formData = new FormData();

    console.log(formData);
    
  
    formData.append("title", values.title);
    formData.append("genre", values.genre);
    formData.append("author", values.author);
    formData.append("description", values.description);
    formData.append("coverImage", (values.coverImage as FileList)[0]);
    formData.append("file", (values.file as FileList)[0]);

    const getToken = () => {
      const token = localStorage.getItem("token") || "";
      // console.log(token);
      return token;
    };
    setIsLoading(true)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      toast({
        title: "Success.",
        description: "Book uploaded success fully",
      });
      console.log("Book created successfully:", response);
      setIsLoading(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error.",
        description: "Book Upload failed.",
      });
      console.error("Error creating book:", error);
      setIsLoading(false)
    }
  };

  return (
    <div>
      <AddBookForm onSubmit={formSubmitHandler} isLaoding={isLoading} />
    </div>
  );
}

export default AddBook;
