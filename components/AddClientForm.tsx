"use client";

import { useState } from "react";
import { addClient } from "@/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AddClientForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email) {
      toast.error("Please enter both name and email.");
      return;
    }
    try {
      setLoading(true);
      await addClient({ name, email });
      toast.success(`${name} added successfully`);
      setName("");
      setEmail("");
      window.location.reload();
    } catch (err: any) {
      toast.error("Failed to add client.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
      <div>
        <input
          type="text"
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Client"}
      </Button>
    </form>
  );
}
