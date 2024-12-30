import { createClient } from "@/lib/supabase/api";
import { z } from "zod";

const answersSchema = z.array(
  z.object({
    id: z.string(),
    answer: z.string(),
    is_correct: z.boolean(),
    question_id: z.string(),
  })
);

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  if (req.method === "PATCH") {
    const { answers } = req.body;

    const parsed = answersSchema.safeParse(answers);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }

    const { data, error } = await supabase
      .from("answers")
      .upsert(parsed.data)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data[0]);
  }

  return res.status(405).appendHeader("Allow", "PATCH").end();
}
