import { z } from "zod";
import { createClient } from "@/lib/supabase/api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).appendHeader("Allow", "POST").end();
  }

  const supabase = createClient(req, res);

  const { email, password } = req.body;

  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.message });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
}
