import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).appendHeader("Allow", "POST").end();
  }

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
