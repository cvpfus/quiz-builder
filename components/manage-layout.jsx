import { Button } from "./ui/button";
import { useLogout } from "@/hooks/use-logout";
import { useRouter } from "next/router";

export default function ManageLayout({ children }) {
  const { mutate: logout } = useLogout();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Button className="self-end m-4" onClick={handleLogout}>
        Log out
      </Button>
      <h1 className="text-2xl font-bold mb-4">Quiz Management</h1>
      {children}
    </div>
  );
}
