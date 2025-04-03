"use client";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.href = "/dashboard";
    });
  }, []);

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the magic link");
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <div className="space-y-4 w-full max-w-sm">
        <Button
          onClick={() => handleOAuthLogin("google")}
          disabled={loading}
          className="w-full"
        >
          Continue with Google
        </Button>
        <Button
          onClick={() => handleOAuthLogin("github")}
          disabled={loading}
          className="w-full"
        >
          Continue with GitHub
        </Button>
        <div className="border-t my-4" />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <Button
          onClick={handleEmailLogin}
          disabled={loading}
          className="w-full"
        >
          Send Magic Link
        </Button>
      </div>
    </main>
  );
}
