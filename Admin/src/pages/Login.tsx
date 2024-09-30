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
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/http/api";
import { useMutation} from "react-query";
import { LoaderCircle } from "lucide-react";
import useTokenStore from "@/store/store";
import Cookies from "js-cookie";

function Login() {
  const { toast } = useToast();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setToken = useTokenStore(state => state.setToken)

  //jab server pr data bhejana ho to mutation ka use karte hai
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (resp: any) => {
      console.log("User Data", resp.data);
      
      toast({
        title: "Authentication",
        description: "Login successful",
      });

      setToken(resp.data.data);
      Cookies.set('token', resp.data.data, { expires: 7, secure: true }); //store token in cookie storage
      /* 
      const token = Cookies.get('token'); // to get token
      Cookies.remove('token'); // to remove token while uninstalling
      */
      navigate("/home");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Authentication",
        description: "Login failed",
      });
    },
  });

  const handleLoginSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Authentication",
        description: "All fields are required",
      });
      return;
    }

    mutation.mutate({ email, password });
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
          <Button onClick={handleLoginSubmit} className="w-full" disabled={mutation.isLoading} >
            {mutation.isLoading && <LoaderCircle className="animate-spin size-10" /> }
            <span className="">Login</span>
          </Button>
        </CardFooter>
        <div className="my-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/auth/resister"} className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;
