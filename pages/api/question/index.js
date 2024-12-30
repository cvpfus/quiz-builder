import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).appendHeader("Allow", "POST").end();
  }

  const supabase = createClient(req, res);

  const { quiz_id, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  if (!quiz_id) {
    return res.status(400).json({ error: "Quiz ID is required" });
  }

  const { error } = await supabase
    .from("questions")
    .insert({ quiz_id, question })
    .select(`*`);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // small delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  const { data: combinedData, error: combinedError } = await supabase
    .from("questions")
    .select(`*, answers(*)`)
    .eq("quiz_id", quiz_id)
    .order("created_at", { ascending: false });

  if (combinedError) {
    return res.status(400).json({ error: combinedError.message });
  }

  return res.status(200).json(combinedData[0]);
}
