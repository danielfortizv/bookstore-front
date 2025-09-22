"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthorsApi, type Author } from "@/hooks/useAuthorsApi";

type Ctx = { authors: Author[]; setAuthors: React.Dispatch<React.SetStateAction<Author[]>>; };
const AuthorsCtx = createContext<Ctx | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const api = useAuthorsApi();

  useEffect(() => { api.list().then(setAuthors).catch(console.error); }, [api]);

  return <AuthorsCtx.Provider value={{ authors, setAuthors }}>{children}</AuthorsCtx.Provider>;
}

export function useAuthorsState() {
  const ctx = useContext(AuthorsCtx);
  if (!ctx) throw new Error("useAuthorsState debe usarse dentro de AuthorsProvider");
  return ctx;
}
