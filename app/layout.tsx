import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ojo Israel | Frontend Developer",
  description: "Portfolio of Ojo Israel - Frontend Developer specializing in React and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#09090b] text-neutral-200 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}