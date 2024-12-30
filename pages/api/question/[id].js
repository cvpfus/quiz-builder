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
      return res.status(400).json({ error: parsed.error.message });
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

  return res.status(405).appendHeader("Allow", "PATCH").end();
}
