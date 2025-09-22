"use client";

export type Author = {
  id: number;
  name: string;
  description: string;
  image: string;
  birthDate: string;
};

const BASE = "http://127.0.0.1:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export function useAuthorsApi() {
  return {
    list:   () => request<Author[]>("/authors"),
    get:    (id: number) => request<Author>(`/authors/${id}`),
    create: (data: Omit<Author, "id">) =>
      request<Author>("/authors", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Omit<Author, "id">) =>
      request<Author>(`/authors/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number) => request<void>(`/authors/${id}`, { method: "DELETE" }),
  };
}
