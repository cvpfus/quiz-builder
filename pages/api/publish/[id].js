import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  if (req.method === "PATCH") {
    const { id } = req.query;

    const { error } = await supabase
      .from("quizzes")
      .update({ is_published: true })
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Quiz published successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
