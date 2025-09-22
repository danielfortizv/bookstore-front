"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthorsApi } from "@/hooks/useAuthorsApi";
import { useAuthorsState } from "../providers/AuthorsProvider";

export default function AuthorsPage() {
  const { authors, setAuthors, isFav, toggleFav } = useAuthorsState();
  const api = useAuthorsApi();

  // lo dejo aquí porque en el enunciado del pre decían useEffect en la página
  useEffect(() => {
    if (authors.length === 0) {
      api.list().then(setAuthors).catch((e) => console.error(e));
    }
  }, [authors.length, api, setAuthors]);

  async function handleDelete(id: number, name: string) {
    try {
      const detail = await api.get(id);
      // si el back trae libros, no dejo borrar
      if ((detail as any).books?.length) {
        alert("No se puede eliminar '" + name + "' porque tiene libros.");
        return;
      }
      await api.remove(id);
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (e: any) {
      alert(e?.message || "No se pudo eliminar");
    }
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Autores</h1>
        <div className="flex gap-2">
          <Link href="/favoritos" className="border rounded px-3 py-1">
            Ver favoritos
          </Link>
          <Link href="/crear" className="border rounded px-3 py-1">
            Crear
          </Link>
        </div>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {authors.map((a) => {
          const fav = isFav(a.id);
          return (
            <li key={a.id} className="border rounded p-3 space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={a.image}
                  alt={"Foto de " + a.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-sm opacity-70">{a.birthDate}</div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFav(a.id)}
                  aria-label={fav ? `Quitar ${a.name} de favoritos` : `Agregar ${a.name} a favoritos`}
                  aria-pressed={fav}
                  className={"border rounded px-2 py-1 "}
                  title={fav ? "En favoritos" : "Marcar como favorito"}
                >
                  {fav ? ":D" : ":/"}
                </button>
              </div>

              <p className="text-sm">{a.description}</p>

              <div className="flex gap-2">
                <Link
                  href={`/authors/${a.id}/edit`}
                  className="border rounded px-3 py-1"
                  aria-label={"Editar autor " + a.name}
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(a.id, a.name)}
                  className="border rounded px-3 py-1"
                  aria-label={"Eliminar autor " + a.name}
                >
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
