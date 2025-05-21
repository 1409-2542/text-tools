import Base64Tool from '@/components/Base64Tool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Base64 Encode/Decode Tool - Online Converter | TextToolsPro',
  description: 'Free online tool to encode text or files to Base64 and decode Base64 back to original format. Fast, secure, and easy to use.',
  keywords: 'base64 encode, base64 decode, base64 converter, online base64, text to base64',
  openGraph: {
    title: 'Base64 Encode/Decode Tool - Online Converter | TextToolsPro',
    description: 'Free online tool to encode text or files to Base64 and decode Base64 back to original format.',
    url: 'https://www.texttoolspro.com/base64-encode-decode',
    images: 'https://www.texttoolspro.com/images/base64-og.jpg',
  },
  twitter: {
    title: 'Base64 Encode/Decode Tool - Online Converter | TextToolsPro',
    description: 'Free online tool to encode text or files to Base64 and decode Base64 back to original format.',
    images: 'https://www.texttoolspro.com/images/base64-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/base64-encode-decode'
  }
}

export default function Base64Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 Encode/Decode Tool",
    "url": "https://www.texttoolspro.com/base64-encode-decode",
    "description": "Free online tool to encode text or files to Base64 and decode Base64 strings back to original format",
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
            { label: 'Base64 Encode/Decode', href: '/tools/base64-encode-decode' }
          ]}
        />
      </div>
      <Base64Tool />
    </>
  )
}