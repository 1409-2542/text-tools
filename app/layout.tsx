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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="author" content="Simple Text Tools" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://yourdomain.com/og-image.png" />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white shadow p-4 text-center text-xl font-bold">
          Simple Text Tools
        </header>
        <main className="p-4 max-w-3xl mx-auto">{children}</main>
        <footer className="text-center text-sm text-gray-500 mt-8 p-4">
          © {new Date().getFullYear()} Simple Text Tools
        </footer>
      </body>
    </html>
  );
}
