import { Button } from "./ui/button";
import { useLogout } from "@/hooks/use-logout";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function ManageLayout({ children }) {
  const { mutate: logout } = useLogout();

  const router = useRouter();

  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Button className="self-end m-4" onClick={handleLogout}>
        {t("logout")}
      </Button>
      <h1 className="text-2xl font-bold mb-4">{t("quizManagement")}</h1>
      {children}
    </div>
  );
}
