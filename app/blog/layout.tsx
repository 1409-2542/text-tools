import type { Metadata } from 'next'
import './blog.css'

export const metadata: Metadata = {
  title: 'TextToolsPro Blog - Writing Tips & Text Tool Guides',
  description: 'Expert articles on writing, content creation, SEO, and text processing tools to improve your productivity.',
  keywords: 'writing tips, content creation, SEO writing, text tools, word counter, grammar checker, writing tools blog',
  authors: [{ name: 'TextToolsPro' }],
  robots: 'index, follow',
  openGraph: {
    title: 'TextToolsPro Blog - Writing Tips & Text Tool Guides',
    description: 'Expert articles on writing, content creation, SEO, and text processing tools to improve your productivity.',
    type: 'website',
    url: 'https://www.texttoolspro.com/blog',
    images: 'https://www.texttoolspro.com/images/blog-og-image.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextToolsPro Blog - Writing Tips & Text Tool Guides',
    description: 'Expert articles on writing, content creation, SEO, and text processing tools to improve your productivity.',
    images: 'https://www.texttoolspro.com/images/blog-twitter-card.jpg',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TextToolsPro Blog",
    "url": "https://www.texttoolspro.com/blog",
    "description": "Expert articles on writing, content creation, SEO, and text processing tools",
    "publisher": {
      "@type": "Organization",
      "name": "TextToolsPro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.texttoolspro.com/logo.png"
      }
    }
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}