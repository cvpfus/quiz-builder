import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  if (req.method === "GET") {
    const { id } = req.query;
    
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

  if (req.method === "DELETE") {
    const { id } = req.query;

    const { error } = await supabase
      .from("quizzes")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Quiz deleted successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
