"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithOAuth(provider: "google" | "github") {
  const supabase = await createClient();
  const origin = new URL(
    "/",
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin.origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    throw new Error(error?.message || "OAuth login failed");
  }

  redirect(data.url);
}
