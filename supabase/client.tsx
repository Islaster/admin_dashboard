import { supabase } from "./supabaseClient";

export async function addClient({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("clients").insert([
    {
      name,
      email,
      user_id: user.id, // 🔒 this is required now
    },
  ]);

  if (error) throw error;
  return data;
}

export async function getClients() {
  const { data, error } = await supabase.from("clients").select("*");

  if (error) throw error;
  return data;
}

export async function deleteClient(id: string) {
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw error;
}

export async function updateClient(
  id: string,
  updates: { name: string; email: string }
) {
  const { error } = await supabase.from("clients").update(updates).eq("id", id);

  if (error) throw error;
}
