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
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { t } = useTranslation();

  const { mutate: register, isPending } = useRegister();

  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();

    register(
      { email, password, role },
      {
        onSuccess: () => {
          toast({
            title: t("success"),
            description: t("registerSuccess"),
          });

          router.push("/quiz");
        },
      }
    );
  };

  return (
    <form
      className="flex justify-center items-center h-screen px-4"
      onSubmit={handleRegister}
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t("register")}</CardTitle>
          <CardDescription>
            <span>{t("registerDescription")} </span>
            <Link href="/login" className="font-bold underline text-black">
              {t("login")}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            placeholder={t("password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Label>{t("role")}</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectRole")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">{t("user")}</SelectItem>
              <SelectItem value="creator">{t("creator")}</SelectItem>
            </SelectContent>
          </Select>

          <Button className="flex gap-2">
            {isPending && <Loader2 className="animate-spin" />}
            <span>{t("register")}</span>
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
