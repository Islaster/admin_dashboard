import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";

export default async function AuthCallback() {
  const allHeaders = await headers();

  console.log("🔥 HEADERS:");
  for (const [key, value] of allHeaders.entries()) {
    console.log(`${key}: ${value}`);
  }

  const supabase = createServerComponentClient<Database>({
    cookies: () => cookies() as any,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION IN /auth/callback:", session);
  if (session) {
    redirect("/dashboard"); // ✅ Redirect only after server sees the session
  }
}
