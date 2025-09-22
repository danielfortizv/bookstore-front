"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
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

  useEffect(() => { api.list().then(setAuthors).catch(console.error); }, [api]);

  const isFav = (id: number) => favorites.has(id);
  const toggleFav = (id: number) =>
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const value = useMemo(
    () => ({ authors, setAuthors, favorites, isFav, toggleFav }),
    [authors, favorites]
  );

  return <AuthorsCtx.Provider value={value}>{children}</AuthorsCtx.Provider>;
}

export function useAuthorsState() {
  const ctx = useContext(AuthorsCtx);
  if (!ctx) throw new Error("useAuthorsState debe usarse dentro de AuthorsProvider");
  return ctx;
}
