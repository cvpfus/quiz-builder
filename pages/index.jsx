import { Button } from "@/components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function Home() {
  const { t } = useTranslation();

  return (
    <div
      className={`${plusJakartaSans.variable} flex flex-col gap-8 justify-center items-center h-screen`}
    >
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-4xl font-bold">{t("homeTitle")}</h1>
        <p className="text-xl">{t("homeDescription")}</p>
      </div>

      <Link href="/quiz">
        <Button>{t("launchApp")}</Button>
      </Link>
    </div>
  );
}
