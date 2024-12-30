import { createClient } from "@/lib/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Logged out" });
}
