import { createClient } from "@/lib/supabase/api";
import { z } from "zod";

const userAnswersSchema = z.array(
  z.object({
    questionId: z.string(),
    answerId: z.string(),
  })
);

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  if (req.method === "POST") {
    const { id } = req.query;
    const { userAnswers } = req.body;

    const parsedUserAnswers = userAnswersSchema.safeParse(userAnswers);

    if (!parsedUserAnswers.success) {
      return res.status(400).json({ error: "Invalid user answers" });
    }

    const { data, error } = await supabase
      .from("questions")
      .select("*, answers(*)")
      .eq("quiz_id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const correctAnswers = data
      .flatMap((question) =>
        question.answers.filter((answer) => answer.is_correct)
      )
      .map((answer) => answer.id);

    const totalUserCorrectAnswers = parsedUserAnswers.data.filter(
      ({ answerId }) => correctAnswers.includes(answerId)
    ).length;

    const result = parsedUserAnswers.data
      .map(({ questionId, answerId }) => {
        const questionData = data.find(
          (question) => question.id === questionId
        );
        if (!questionData) return null;

        const correctAnswer =
          questionData.answers.find((answer) => answer.is_correct)?.answer ||
          "";
        const userAnswer =
          questionData.answers.find((answer) => answer.id === answerId)
            ?.answer || "";

        return {
          question: questionData.question,
          userAnswer,
          correctAnswer,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      totalCorrectAnswers: totalUserCorrectAnswers,
      totalQuestions: data.length,
      score: (totalUserCorrectAnswers / data.length) * 100,
      result,
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
