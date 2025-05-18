import MarkdownToHtmlTool from '@/components/MarkdownToHtmlTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter - Free Online Tool | TextToolsPro',
  description: 'Convert Markdown formatted text to HTML code instantly with our free online tool. Perfect for developers and content creators.',
  keywords: 'markdown to html, markdown converter, html converter, markdown parser',
  openGraph: {
    title: 'Markdown to HTML Converter - Free Online Tool | TextToolsPro',
    description: 'Convert Markdown formatted text to HTML code instantly with our free online tool. Perfect for developers and content creators.',
    url: 'https://www.texttoolspro.com/markdown-to-html',
    images: 'https://www.texttoolspro.com/images/markdown-to-html-og.jpg',
  },
  twitter: {
    title: 'Markdown to HTML Converter - Free Online Tool | TextToolsPro',
    description: 'Convert Markdown formatted text to HTML code instantly with our free online tool.',
    images: 'https://www.texttoolspro.com/images/markdown-to-html-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/markdown-to-html'
  }
}

export default function MarkdownToHtmlPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Markdown to HTML Converter",
    "url": "https://www.texttoolspro.com/markdown-to-html",
    "description": "Free online tool to convert Markdown formatted text to HTML code",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "TextToolsPro"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Text Tools', href: '/tools' },
            { label: 'Markdown to HTML', href: '/tools/markdown-to-html' }
          ]}
        />
      </div>
      <MarkdownToHtmlTool />
    </>
  )
}