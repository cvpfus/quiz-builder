import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/use-register";
import { useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { mutate: register, isPending } = useRegister();

  const handleRegister = (e) => {
    e.preventDefault();

    register(
      { email, password, role },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Registration successful",
          });
        },
      }
    );
  };

  return (
    <form
      className="flex justify-center items-center h-screen"
      onSubmit={handleRegister}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            <span>Already have an account? </span>
            <Link href="/login" className="font-bold underline text-black">
              Login
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

          <Label>Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="creator">Creator</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>

          <Button className="flex gap-2">
            {isPending && <Loader2 className="animate-spin" />}
            <span>Register</span>
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
