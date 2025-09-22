import "./globals.css";
import type { Metadata } from "next";
import { AuthorsProvider } from "./providers/AuthorsProvider";

export const metadata: Metadata = { title: "Bookstore" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="mx-auto max-w-4xl p-6">
          <AuthorsProvider>{children}</AuthorsProvider>
        </div>
      </body>
    </html>
  );
}
