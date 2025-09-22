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

  const isNameInvalid = name.trim() === "";
  const isBirthInvalid = birthDate.trim() === "";
  const isImageInvalid = image.trim() === "";
  const isDescInvalid = description.trim() === "";
  const isFormValid = !(isNameInvalid || isBirthInvalid || isImageInvalid || isDescInvalid);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;
    const created = await api.create({
      name,
      birthDate,
      image,
      description,
    } as Omit<Author, "id">);
    setAuthors((prev) => [created, ...prev]);
    router.push("/authors");
  }

  return (
    <main className="p-1">
      <h1 className="text-2xl font-semibold mb-4">Crear autor</h1>
      <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
        <div>
          <label className="block text-sm" htmlFor="name">Nombre</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={isNameInvalid}
            aria-describedby={isNameInvalid ? "err-name" : undefined}
            className="border rounded w-full p-2"
          />
          {isNameInvalid && (
            <p id="err-name" role="alert" className="text-sm text-red-600">
              El nombre es requerido
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm" htmlFor="birth">Fecha de nacimiento</label>
          <input
            id="birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            aria-invalid={isBirthInvalid}
            aria-describedby={isBirthInvalid ? "err-birth" : undefined}
            className="border rounded w-full p-2"
          />
          {isBirthInvalid && (
            <p id="err-birth" role="alert" className="text-sm text-red-600">
              La fecha es requerida
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm" htmlFor="image">Imagen (URL)</label>
          <input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            aria-invalid={isImageInvalid}
            aria-describedby={isImageInvalid ? "err-image" : undefined}
            className="border rounded w-full p-2"
          />
          {isImageInvalid && (
            <p id="err-image" role="alert" className="text-sm text-red-600">
              La imagen es requerida
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm" htmlFor="desc">Descripción</label>
          <textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-invalid={isDescInvalid}
            aria-describedby={isDescInvalid ? "err-desc" : undefined}
            className="border rounded w-full p-2"
          />
          {isDescInvalid && (
            <p id="err-desc" role="alert" className="text-sm text-red-600">
              La descripción es requerida
            </p>
          )}
        </div>

        <button
          disabled={!isFormValid}
          className="border rounded px-4 py-2 disabled:opacity-50"
        >
          Crear
        </button>
      </form>
    </main>
  );
}
