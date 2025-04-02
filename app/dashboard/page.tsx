// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import { ClientTable } from "@/components/ClientTable";
import AddClientForm from "@/components/AddClientForm";
import NavBar from "@/components/navbar";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({
    cookies: () => cookies() as any, // match what you're doing in /login
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen p-6">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AddClientForm />
      <ClientTable clients={clients ?? []} />
    </main>
  );
}
