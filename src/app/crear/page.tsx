"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthorsApi, type Author } from "@/hooks/useAuthorsApi";
import { useAuthorsState } from "../providers/AuthorsProvider";

export default function CrearPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const api = useAuthorsApi();
  const { setAuthors } = useAuthorsState();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await api.create({ name, birthDate, image, description } as Omit<Author,"id">);
    setAuthors(prev => [created, ...prev]); // Paso 5
    router.push("/authors");
  };

  return (
    <main className="p-1">
      <h1 className="text-2xl font-semibold mb-4">Crear autor</h1>
      <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
        <div><label className="block text-sm">Nombre</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="border rounded w-full p-2"/></div>
        <div><label className="block text-sm">Fecha de nacimiento</label>
          <input type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)} className="border rounded w-full p-2"/></div>
        <div><label className="block text-sm">Imagen (URL)</label>
          <input value={image} onChange={e=>setImage(e.target.value)} className="border rounded w-full p-2"/></div>
        <div><label className="block text-sm">Descripción</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} className="border rounded w-full p-2"/></div>
        <button className="border rounded px-4 py-2">Crear</button>
      </form>
    </main>
  );
}
