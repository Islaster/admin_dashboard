import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ClientTable } from "@/components/ClientTable";
import AddClientForm from "@/components/AddClientForm";
import NavBar from "@/components/navbar";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Auth Check
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/login");
  }

  // 2. Fetch Clients
  const { data: clients, error: clientError } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userData.user.id) // optional: fetch only the user's clients
    .order("created_at", { ascending: false });

  if (clientError) {
    console.error("Error loading clients:", clientError.message);
  }

  // 3. Render Page
  return (
    <main className="min-h-screen p-6">
      <NavBar />
      <AddClientForm />
      <ClientTable clients={clients ?? []} />
    </main>
  );
}
