"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthorsApi, type Author } from "@/hooks/useAuthorsApi";
import { useAuthorsState } from "@/app/providers/AuthorsProvider";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const authorId = Number(id);
  const api = useAuthorsApi();
  const { authors, setAuthors } = useAuthorsState();
  const router = useRouter();

  const existing = authors.find(a => a.id === authorId);
  const [name, setName] = useState(existing?.name ?? "");
  const [birthDate, setBirthDate] = useState(existing?.birthDate ?? "");
  const [image, setImage] = useState(existing?.image ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");

  useEffect(() => {
    if (!existing) {
      api.get(authorId).then(a => {
        setName(a.name); setBirthDate(a.birthDate); setImage(a.image); setDescription(a.description);
      });
    }
  }, [existing, authorId, api]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await api.update(authorId, { name, birthDate, image, description } as Omit<Author,"id">);
    setAuthors(prev => prev.map(a => a.id === authorId ? updated : a));
    router.push("/authors");
  };

  return (
    <main className="p-1">
      <h1 className="text-2xl font-semibold mb-4">Editar autor</h1>
      <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
        <div><label className="block text-sm">Nombre</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="border rounded w-full p-2"/></div>
        <div><label className="block text-sm">Fecha de nacimiento</label>
          <input type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)} className="border rounded w-full p-2"/></div>
        <div><label className="block text-sm">Imagen (URL)</label>
          <input value={image} onChange={e=>setImage(e.target.value)} className="border rounded w-full p-2"/></div>
        <div><label className="block text-sm">Descripción</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} className="border rounded w-full p-2"/></div>
        <button className="border rounded px-4 py-2">Guardar</button>
      </form>
    </main>
  );
}
