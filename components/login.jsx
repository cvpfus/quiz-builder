import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLogin } from "@/hooks/use-login";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useLogin();

  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    login(
      { email, password },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Login successful",
          });

          router.push("/quiz");
        },
      }
    );
  };

  return (
    <form
      className="flex justify-center items-center h-screen"
      onSubmit={handleLogin}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            <span>Don't have an account? </span>
            <Link href="/register" className="font-bold underline text-black">
              Register
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={isPending} className="flex gap-2">
            {isPending && <Loader2 className="animate-spin" />}
            <span>Login</span>
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
