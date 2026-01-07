import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logik-Rätsel: Verteilung",
  description: "Interaktive Lern-App für Kinder - Verteilungs-Rätsel mit Drag-and-Drop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
