import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYGD - Muslim Youth Greater Detroit",
  description: "A vibrant community of young Muslims rooted at the Islamic Association of Greater Detroit. Grow in faith, build friendships, and develop leadership skills.",
  keywords: ["MYGD", "Muslim Youth", "Greater Detroit", "IAGD", "Islamic Association", "Youth Group", "Muslim Community"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
