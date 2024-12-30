import ExploreLayout from "@/components/explore-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetQuizzes } from "@/hooks/use-get-quizzes";
import { Loader2, NotebookPen } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ExplorePage() {
  const { t } = useTranslation();
  const { data: quizzes, isLoading } = useGetQuizzes();

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>{t("quizzes")}</CardTitle>
        <CardDescription>{t("exploreQuizzesDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {quizzes && quizzes.length === 0 && (
          <p className="text-sm text-center">{t("userNoQuizzes")}</p>
        )}

        {quizzes &&
          quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{quiz.title}</span>
                  <span className="italic">
                    {quiz.totalQuestions} {t("questions")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-end">
                <Link href={`/quiz/take/${quiz.id}`}>
                  <Button>
                    <NotebookPen />
                    <span>{t("takeQuiz")}</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
}

ExplorePage.getLayout = function getLayout(page) {
  return <ExploreLayout>{page}</ExploreLayout>;
};
