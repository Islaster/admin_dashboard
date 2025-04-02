"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabaseClient";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b bg-white text-gray-900">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-semibold">
          My Portfolio
        </Link>
        <Link href="/dashboard" className="text-sm hover:underline">
          Dashboard
        </Link>
        <Link href="/resume" className="text-sm hover:underline">
          Resume
        </Link>
      </div>
      <Button onClick={handleLogout} variant="outline">
        Sign Out
      </Button>
    </nav>
  );
}
