"use client";

import { useEffect, useState } from "react";
import { getClients, updateClient, deleteClient } from "@/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type Client = {
  id: string;
  name: string;
  email: string;
  user_id: string;
  created_at: string;
};

type ClientTableProps = {
  clients: Client[];
};

export function ClientTable({ clients }: ClientTableProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [localClients, setLocalClients] = useState<Client[]>(clients);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this client?");
    if (!confirmed) return;
    await deleteClient(id);
    toast.success("Client deleted.");
    setLocalClients((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (client: Client) => {
    setEditId(client.id);
    setName(client.name);
    setEmail(client.email);
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      await updateClient(editId, { name, email });
      setLocalClients((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, name, email } : c))
      );
      toast.success("Client updated.");
    } catch {
      toast.error("Update failed");
    } finally {
      setEditId(null);
    }
  };

  return (
    <table className="w-full border text-left">
      <thead>
        <tr className="border-b">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {localClients.map((client) => (
          <tr key={client.id} className="border-b">
            <td className="p-2">
              {editId === client.id ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-2 py-1"
                />
              ) : (
                client.name
              )}
            </td>
            <td className="p-2">
              {editId === client.id ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-2 py-1"
                />
              ) : (
                client.email
              )}
            </td>
            <td className="p-2 space-x-2">
              {editId === client.id ? (
                <Button onClick={handleUpdate}>Save</Button>
              ) : (
                <Button onClick={() => handleEdit(client)}>Edit</Button>
              )}
              <Button
                variant="destructive"
                onClick={() => handleDelete(client.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
