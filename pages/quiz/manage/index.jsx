import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ManageLayout from "@/components/manage-layout";
import Link from "next/link";

export default function ManagePage() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center">
        <Link href="/quiz/manage/create">
          <Button className="flex items-center gap-2">
            <Plus />
            <span>Create Quiz</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

ManagePage.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;
