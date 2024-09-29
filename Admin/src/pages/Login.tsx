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
import { Link , useNavigate} from "react-router-dom";

function Login() {
  const { toast } = useToast();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const handleLoginSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      });
      toast({
        title: "Authentication",
        description: "Login successfull",
      });
      navigate('/home/')
    } catch (error) {
      toast({
        title: "Authentication",
        description: "Login Failed",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
        </CardContent>
        <CardFooter>
          <Button onClick={handleLoginSubmit} className="w-full">
            Login
          </Button>
        </CardFooter>
        <div className="my-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/resister"} className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;
