import RemoveDuplicateLinesTool from '@/components/RemoveDuplicateLinesTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines Tool - Clean Text Online | TextToolsPro',
  description: 'Free online tool to remove duplicate lines from text instantly. Perfect for cleaning lists, data sets, and documents.',
  keywords: 'remove duplicate lines, delete repeated lines, text cleaner, duplicate line remover',
  openGraph: {
    title: 'Remove Duplicate Lines Tool - Clean Text Online | TextToolsPro',
    description: 'Free online tool to remove duplicate lines from text instantly.',
    url: 'https://www.texttoolspro.com/remove-duplicate-lines',
    images: 'https://www.texttoolspro.com/images/remove-duplicates-og.jpg',
  },
  twitter: {
    title: 'Remove Duplicate Lines Tool - Clean Text Online | TextToolsPro',
    description: 'Free online tool to remove duplicate lines from text instantly.',
    images: 'https://www.texttoolspro.com/images/remove-duplicates-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/remove-duplicate-lines'
  }
}

export default function RemoveDuplicateLinesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Remove Duplicate Lines Tool",
    "url": "https://www.texttoolspro.com/remove-duplicate-lines",
    "description": "Free online tool to remove duplicate lines from text documents and data sets",
    "applicationCategory": "DataCleaningApplication",
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
            { label: 'Remove Duplicate Lines', href: '/tools/remove-duplicate-lines' }
          ]}
        />
      </div>
      <RemoveDuplicateLinesTool />
    </>
  )
}