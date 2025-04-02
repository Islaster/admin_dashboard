"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 1. Track auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        window.location.href = "/dashboard"; // final bulletproof fallback
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOAuthLogin = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://127.0.0.1:3000/auth/callback",
      },
    });

    if (error) alert(error.message);
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
