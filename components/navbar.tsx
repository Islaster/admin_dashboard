"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Create the browser client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Check authentication status on component mount
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkUser();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh(); // Force a refresh to update server state
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b bg-white text-gray-900">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-semibold">
          Admin Dashboard
        </Link>
      </div>
      {isAuthenticated ? (
        <Button onClick={handleLogout} variant="outline" disabled={isLoading}>
          {isLoading ? "Signing Out..." : "Sign Out"}
        </Button>
      ) : (
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      )}
    </nav>
  );
}
