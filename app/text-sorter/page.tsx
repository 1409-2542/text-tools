import TextSorterTool from '@/components/TextSorterTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Sorter Tool - Sort Lines Alphabetically (A-Z) or Reverse (Z-A) | TextToolsPro',
  description: 'Free online tool to sort text lines alphabetically (A-Z) or reverse alphabetically (Z-A). Perfect for organizing lists and data.',
  keywords: 'text sorter, sort alphabetically, sort lines, A-Z sorter, Z-A sorter',
  openGraph: {
    title: 'Text Sorter Tool - Sort Lines Alphabetically Online | TextToolsPro',
    description: 'Free online tool to sort text lines alphabetically (A-Z) or reverse alphabetically (Z-A). Perfect for organizing lists and data.',
    url: 'https://www.texttoolspro.com/text-sorter',
    images: 'https://www.texttoolspro.com/images/text-sorter-og.jpg',
  },
  twitter: {
    title: 'Text Sorter Tool - Sort Lines Alphabetically Online | TextToolsPro',
    description: 'Free online tool to sort text lines alphabetically (A-Z) or reverse alphabetically (Z-A). Perfect for organizing lists and data.',
    images: 'https://www.texttoolspro.com/images/text-sorter-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/text-sorter'
  }
}

export default function TextSorterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Sorter Tool",
    "url": "https://www.texttoolspro.com/text-sorter",
    "description": "Free online tool to sort text lines alphabetically or reverse alphabetically",
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
            { label: 'Text Tools', href: '/#tools' },
            { label: 'Text Sorter', href: '/text-sorter' }
          ]}
        />
      </div>
      <TextSorterTool />
    </>
  )
}