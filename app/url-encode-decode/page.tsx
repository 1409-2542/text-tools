import UrlEncodeDecodeTool from '@/components/UrlEncodeDecodeTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'URL Encode/Decode Tool - Online Percent Encoding | TextToolsPro',
  description: 'Free online tool to encode special characters for URLs or decode encoded URLs. Essential for web developers and SEO specialists.',
  keywords: 'URL encode, URL decode, percent encoding, URL encoder, URL decoder',
  openGraph: {
    title: 'URL Encode/Decode Tool - Online Percent Encoding | TextToolsPro',
    description: 'Free online tool to encode special characters for URLs or decode encoded URLs.',
    url: 'https://www.texttoolspro.com/url-encode-decode',
    images: 'https://www.texttoolspro.com/images/url-encode-og.jpg',
  },
  twitter: {
    title: 'URL Encode/Decode Tool - Online Percent Encoding | TextToolsPro',
    description: 'Free online tool to encode special characters for URLs or decode encoded URLs.',
    images: 'https://www.texttoolspro.com/images/url-encode-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/url-encode-decode'
  }
}

export default function UrlEncodeDecodePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "URL Encode/Decode Tool",
    "url": "https://www.texttoolspro.com/url-encode-decode",
    "description": "Free online tool to encode and decode URLs using percent-encoding",
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
            { label: 'Text Tools', href: '/#tools' },
            { label: 'URL Encode/Decode', href: '/url-encode-decode' }
          ]}
        />
      </div>
      <UrlEncodeDecodeTool />
    </>
  )
}