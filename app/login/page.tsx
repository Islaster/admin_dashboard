import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies as getCookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const cookieStore = await getCookies(); // ✅ await it now

  const supabase = createServerComponentClient({
    cookies: () => cookieStore as any, // ✅ pass the awaited store as a sync function
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
