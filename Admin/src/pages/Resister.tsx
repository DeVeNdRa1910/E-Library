import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Resister() {

  const { toast } = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const handleResisterSubmit = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if(password != confirmPassword){
      toast({
        variant: "destructive",
        title: "Authentication",
        description: "Password and Confirm Password do not match",
      });
      console.log("Password and Confirm Password do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name: name,
        email: email,
        password: password,
      });
      toast({
        title: "Authentication",
        description: "Login successfull",
      });
      navigate('/home/')
    } catch (error: any) {
      console.log(error.response.data.message);
      toast({
        title: "Authentication",
        description: error.response.data.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Resister</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input ref={nameRef} id="name" type="name" placeholder="example abc" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input ref={confirmPasswordRef} id="confirm-password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleResisterSubmit} className="w-full">Resister</Button>
        </CardFooter>
        <div className="my-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={'/auth/login'} className="underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Resister
