import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tweet | a micro blogging web application.",
  description: "Tweet is a micro blogging web application, design and developed by Mazharul Islam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <div className="bg-slate-900 min-h-screen flex">
          {children}
        </div>
      </body>
    </html>
  );
}
