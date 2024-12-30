import { Button } from "@/components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${plusJakartaSans.variable} flex justify-center items-center h-screen`}
    >
      <Link href="/quiz">
        <Button>Launch App</Button>
      </Link>
    </div>
  );
}
