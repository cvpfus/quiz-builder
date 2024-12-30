import { useGetResult } from "@/hooks/use-get-result";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export default function Result({ id, selectedAnswers }) {
  const { data: result, isLoading } = useGetResult({
    id,
    userAnswers: selectedAnswers,
  });

  const { t, i18n } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">{t("result")}</h1>

      {isLoading && <Loader2 className="animate-spin" />}
      {result && (
        <Card className="w-full max-w-5xl">
          <CardHeader className="grid grid-cols-3 gap-5 space-y-0">
            <div className="p-2 border rounded-md">
              <div className="text-sm">{t("totalCorrectAnswers")}</div>
              <div className="text-2xl font-bold">
                {result?.totalCorrectAnswers}
              </div>
            </div>
            <div className="p-2 border rounded-md">
              <div className="text-sm">{t("totalQuestions")}</div>
              <div className="text-2xl font-bold">{result?.totalQuestions}</div>
            </div>
            <div className="p-2 border rounded-md">
              <div className="text-sm">{t("score")}</div>
              <div className="text-2xl font-bold">{result?.score}</div>
            </div>
          </CardHeader>

          <CardContent>
            <Link href="/quiz/explore">
              <Button>
                {i18n.language === "ar" ? <ArrowRight /> : <ArrowLeft />}
                <span>{t("backToQuizzes")}</span>
              </Button>
            </Link>
          </CardContent>

          <CardFooter className="flex flex-col items-start gap-2">
            {result?.result.map((item, index) => (
              <div key={index} className={`border p-2 rounded-md w-full`}>
                <div className="font-bold">
                  {t("question")} {index + 1}: {item.question}
                </div>
                <div className="text-sm">
                  {t("yourAnswer")}: {item.userAnswer}
                </div>
                <div className="text-sm">
                  {t("correctAnswer")}: {item.correctAnswer}
                </div>
              </div>
            ))}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
