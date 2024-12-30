import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const supabase = createClient(req, res);

    const { title } = req.body;

    const { data, error } = await supabase
      .from("quizzes")
      .insert({
        title,
      })
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data[0]);
  }

  if (req.method === "GET") {
    const { creatorId } = req.query;

    const supabase = createClient(req, res);

    if (!creatorId) {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*, questions(*)")
        .eq("is_published", true);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const returnedData = data.map((quiz) => ({
        id: quiz.id,
        title: quiz.title,
        totalQuestions: quiz.questions.length,
      }));

      return res.status(200).json(returnedData);
    }

    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("creator_id", creatorId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
