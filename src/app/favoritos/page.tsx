"use client";

import Link from "next/link";
import { useAuthorsState } from "../providers/AuthorsProvider";

export default function FavoritosPage() {
  const { authors, isFav, toggleFav } = useAuthorsState();
  const favs = authors.filter((a) => isFav(a.id));

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Favoritos</h1>
        <Link href="/authors" className="border rounded px-3 py-1">
          Volver a Autores
        </Link>
      </div>

      {favs.length === 0 ? (
        <p>No hay autores en favoritos.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {favs.map((a) => (
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
                  aria-pressed={true}
                  aria-label={`Quitar ${a.name} de favoritos`}
                  className="border rounded px-2 py-1"
                  title="En favoritos"
                >
                  :D
                </button>
              </div>
              <p className="text-sm">{a.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
