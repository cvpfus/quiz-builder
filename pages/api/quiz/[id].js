import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  const { id } = req.query;

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("quizzes")
      .select(`*, questions(*, answers(*))`)
      .order("created_at", { ascending: true, referencedTable: "questions" })
      .eq("id", id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(data[0]);
  }

  if (req.method === "PATCH") {
    const { id, title } = req.body;

    const { data, error } = await supabase
      .from("quizzes")
      .update({ id, title })
      .select()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data[0]);
  }

  return res.status(405).appendHeader("Allow", "GET").end();
}
