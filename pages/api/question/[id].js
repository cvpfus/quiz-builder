import { createClient } from "@/lib/supabase/api";
import { z } from "zod";

const questionsSchema = z.array(
  z.object({
    id: z.string(),
    question: z.string(),
    quiz_id: z.string(),
  })
);

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  if (req.method === "PATCH") {
    const { questions } = req.body;

    const parsed = questionsSchema.safeParse(questions);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }

    const { data, error } = await supabase
      .from("questions")
      .upsert(parsed.data)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data[0]);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    const { error } = await supabase
      .from("questions")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Question deleted" });
  }

  if (req.method === "GET") {
    const { id } = req.query;

    const { data, error } = await supabase
      .from("questions")
      .select("*, answers(*)")
      .eq("quiz_id", id);

    const { data: titleData } = await supabase
      .from("quizzes")
      .select("title")
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const returnedData = {
      title: titleData[0].title,
      questions: data.map((question) => ({
        id: question.id,
        question: question.question,
        answers: question.answers.map((answer) => ({
          id: answer.id,
          answer: answer.answer,
        })),
      })),
    };

    return res.status(200).json(returnedData);
  }

  return res.status(405).appendHeader("Allow", "PATCH").end();
}
