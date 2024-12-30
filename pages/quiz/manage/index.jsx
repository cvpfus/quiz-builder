import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import ManageLayout from "@/components/manage-layout";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetQuizzesByCreator } from "@/hooks/use-get-quizzes-by-creator";
import { createClient } from "@/lib/supabase/server-props";
import { useRouter } from "next/router";
import { useDeleteQuiz } from "@/hooks/use-delete-quiz";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

export const getServerSideProps = async (context) => {
  const supabase = createClient(context);

  const { data } = await supabase.auth.getUser();

  if (data) {
    return {
      props: {
        creatorId: data.user.id,
      },
    };
  }

  return {
    props: {},
  };
};

export default function ManagePage({ creatorId }) {
  const { data: quizzes, isLoading } = useGetQuizzesByCreator(creatorId);

  const { mutate: deleteQuiz } = useDeleteQuiz();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const handleEdit = (id) => {
    router.push(`/quiz/manage/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteQuiz(id, {
      onSuccess: () => {
        toast({
          title: t("success"),
          description: t("quizDeletedSuccess"),
        });

        queryClient.refetchQueries(["quizzes", creatorId]);
      },
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-4 px-4">
      <Link href="/quiz/manage/create" className="flex justify-center">
        <Button className="flex items-center gap-2">
          <Plus />
          <span>{t("createQuiz")}</span>
        </Button>
      </Link>
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>{t("yourQuizzes")}</CardTitle>
          <CardDescription>{t("yourQuizzesDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {quizzes && quizzes.length === 0 && (
            <p className="text-sm text-center">{t("creatorNoQuizzes")}</p>
          )}

          {quizzes &&
            quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{quiz.title}</span>
                    <span className="italic">
                      {quiz.is_published ? t("published") : t("notPublished")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <Button variant="outline" onClick={() => handleEdit(quiz.id)}>
                    <Pencil />
                    <span>{t("edit")}</span>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">
                        <Trash />
                        <span>{t("delete")}</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("areYouSureDescription")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(quiz.id)}
                        >
                          {t("delete")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}

ManagePage.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;
