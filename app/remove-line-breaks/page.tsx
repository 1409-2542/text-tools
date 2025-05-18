import RemoveLineBreaksTool from '@/components/RemoveLineBreaksTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remove Line Breaks Tool - Clean Text Online | TextToolsPro',
  description: 'Free online tool to remove unwanted line breaks, newlines, and paragraph breaks from your text instantly.',
  keywords: 'remove line breaks, delete newlines, text cleaner, text formatter',
  openGraph: {
    title: 'Remove Line Breaks Tool - Clean Text Online | TextToolsPro',
    description: 'Free online tool to remove unwanted line breaks, newlines, and paragraph breaks from your text instantly.',
    url: 'https://www.texttoolspro.com/remove-line-breaks',
    images: 'https://www.texttoolspro.com/images/remove-line-breaks-og.jpg',
  },
  twitter: {
    title: 'Remove Line Breaks Tool - Clean Text Online | TextToolsPro',
    description: 'Free online tool to remove unwanted line breaks from your text instantly.',
    images: 'https://www.texttoolspro.com/images/remove-line-breaks-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/remove-line-breaks'
  }
}

export default function RemoveLineBreaksPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Remove Line Breaks Tool",
    "url": "https://www.texttoolspro.com/remove-line-breaks",
    "description": "Free online tool to remove unwanted line breaks and newlines from text",
    "applicationCategory": "UtilitiesApplication",
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
            { label: 'Remove Line Breaks', href: '/tools/remove-line-breaks' }
          ]}
        />
      </div>
      <RemoveLineBreaksTool />
    </>
  )
}