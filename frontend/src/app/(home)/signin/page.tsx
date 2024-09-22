"use client";

import React from "react";
import SignInForm, { FormValuse } from "./components/sign-in-form";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/features/hooks/hooks";
import { addUser } from "@/lib/store/features/users/usersSlice";

function SignIn() {
  const { toast } = useToast();
  const router = useRouter();

  const dispatch  = useAppDispatch()

  // console.log("Router: ", router);


  const submitHandler = async (values: FormValuse) => {
    // console.log("Signin Information: ", values);

    // upload data on DB
    // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Ensure the header is set for JSON
          },
        }
      );

      // console.log(resp.data);

      if (resp.data.success) {
        toast({
          title: "Login",
          description: resp.data.message as string,
        });
        localStorage.setItem("token", resp.data.data);
        router.push("/");
      }

      const { userData } = resp.data
      // console.log(userData);
      
      dispatch(addUser(userData))

    } catch (error) {
      console.log("Login Error", error);

      toast({
        title: "Login",
        description: "Login Failed",
      });
    }
  };

  return (
    <div>
      <SignInForm onSubmit={submitHandler} />
    </div>
  );
}

export default SignIn;
