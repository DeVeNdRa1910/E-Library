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
import { register } from "@/http/api";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Register() {
  const { toast } = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (resp: any) => {
      toast({
        title: "Authentication",
        description: "Signup successful",
      });
      Cookies.set('token', resp.data.data, { expires: 7, secure: true }); //store token in cookie storage
      sessionStorage.setItem("token", resp.data.data);
      navigate("/home");
    },
    onError: () => {
      toast({
        title: "Authentication",
        description: "Signup failed",
      });
    },
  });

  const handleResisterSubmit = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password != confirmPassword) {
      toast({
        variant: "destructive",
        title: "Authentication",
        description: "Password and Confirm Password do not match",
      });
      console.log("Password and Confirm Password do not match");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Authentication",
        description: "All fields are required",
      });
      return;
    }

    const role = "admin"

    mutation.mutate({ name, email, password, role });
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
            <Input
              ref={nameRef}
              id="name"
              type="name"
              placeholder="example abc"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              ref={confirmPasswordRef}
              id="confirm-password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleResisterSubmit} className="w-full" disabled={mutation.isLoading}>
          {mutation.isLoading && <LoaderCircle className="animate-spin size-10" /> }
          <span className="">Regidter</span>
          </Button>
        </CardFooter>
        <div className="my-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;
