import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Text Tools",
  description: "Free online tools for quick text editing tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white shadow p-4 text-center text-xl font-bold">
          Text Tools
        </header>
        <main className="p-4 max-w-3xl mx-auto">{children}</main>
        <footer className="text-center text-sm text-gray-500 mt-8 p-4">
          © {new Date().getFullYear()} Text Tools
        </footer>
      </body>
    </html>
  );
}
