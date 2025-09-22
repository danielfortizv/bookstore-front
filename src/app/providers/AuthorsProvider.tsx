"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthorsApi, type Author } from "@/hooks/useAuthorsApi";

type Ctx = {
  authors: Author[];
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  favorites: Set<number>;
  isFav: (id: number) => boolean;
  toggleFav: (id: number) => void;
};

const AuthorsCtx = createContext<Ctx | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const api = useAuthorsApi();

  // traigo los autores una vez (si algo falla lo veo en consola)
  useEffect(() => {
    api.list().then(setAuthors).catch((e) => {
      console.error("error trayendo autores", e);
    });
  }, [api]);

  function isFav(id: number) {
    return favorites.has(id);
  }

  function toggleFav(id: number) {
    // lo hice simple con Set porque me pareció rápido
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <AuthorsCtx.Provider value={{ authors, setAuthors, favorites, isFav, toggleFav }}>
      {children}
    </AuthorsCtx.Provider>
  );
}

export function useAuthorsState() {
  const ctx = useContext(AuthorsCtx);
  if (!ctx) throw new Error("useAuthorsState debe usarse dentro de AuthorsProvider");
  return ctx;
}
