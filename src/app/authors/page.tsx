"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthorsApi } from "@/hooks/useAuthorsApi";
import { useAuthorsState } from "../providers/AuthorsProvider";

export default function AuthorsPage() {
  const { authors, setAuthors } = useAuthorsState();
  const api = useAuthorsApi();

  useEffect(() => {
    if (authors.length === 0) {
      api.list().then(setAuthors).catch(console.error);
    }
  }, [authors.length, api, setAuthors]);

  const handleDelete = async (id: number) => {
    await api.remove(id);
    setAuthors(prev => prev.filter(a => a.id !== id)); // Paso 7
  };

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Autores</h1>
        <Link href="/crear" className="border rounded px-3 py-1">Crear</Link>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {authors.map(a => (
          <li key={a.id} className="border rounded p-3 space-y-2">
            <div className="flex items-center gap-3">
              <img src={a.image} alt={a.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <div className="font-medium">{a.name}</div>
                <div className="text-sm opacity-70">{a.birthDate}</div>
              </div>
            </div>
            <p className="text-sm">{a.description}</p>
            <div className="flex gap-2">
              <Link href={`/authors/${a.id}/edit`} className="border rounded px-3 py-1">Editar</Link>
              <button onClick={() => handleDelete(a.id)} className="border rounded px-3 py-1">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
