import UrlEncodeDecodeTool from '@/components/UrlEncodeDecodeTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'URL Encode/Decode Tool - Online Percent Encoding | TextToolsPro',
  description: 'Free online URL encoder/decoder tool for web developers. Convert special characters to percent-encoding and decode URLs instantly. Supports UTF-8 and all standard encoding formats.',
  keywords: [ // Changed to array format
    'URL encode',
    'URL decode',
    'percent encoding',
    'URL encoder',
    'URL decoder',
    'URL encoding tool',
    'URL decoding tool',
    'online URL encoder',
    'percent encoding decoder',
    'web developer tools',
    'URL parameter encoding',
    'URI encoding',
    'URL escape characters',
    'URL special characters'
  ],
  openGraph: {
    title: 'URL Encode/Decode Tool - Online Percent Encoding | TextToolsPro',
    description: 'Free online tool to encode special characters for URLs or decode encoded URLs. Essential for web development and API work.',
    url: 'https://www.texttoolspro.com/url-encode-decode',
    type: 'website', // Added missing type
    locale: 'en_US', // Added locale
    siteName: 'TextToolsPro', // Added siteName
    images: [ // Changed to array format
      {
        url: 'https://www.texttoolspro.com/images/url-encode-og.jpg',
        width: 1200,
        height: 630,
        alt: 'URL Encoding/Decoding Tool for Web Developers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image', // Added card type
    title: 'URL Encode/Decode Tool - Online Percent Encoding | TextToolsPro',
    description: 'Free online tool to encode special characters for URLs or decode encoded URLs. Essential for web developers.',
    images: [ // Changed to array format
      {
        url: 'https://www.texttoolspro.com/images/url-encode-twitter.jpg',
        width: 1200,
        height: 628,
        alt: 'URL Encoding/Decoding Tool'
      }
    ],
    creator: '@TextToolsPro' // Added if you have a Twitter handle
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/url-encode-decode'
  },
  robots: { // Added robots configuration
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function UrlEncodeDecodePage() {
  // ✅ WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "URL Encode/Decode Tool",
    "url": "https://www.texttoolspro.com/url-encode-decode",
    "description": "Free online tool to encode and decode URLs using percent-encoding (URL encoding). Supports full UTF-8 character set and all standard encoding formats.",
    "applicationCategory": ["DeveloperApplication", "WebApplication"],
    "operatingSystem": ["Web Browser", "Windows", "macOS", "Linux", "Android", "iOS"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "TextToolsPro",
      "url": "https://www.texttoolspro.com"
    },
    "potentialAction": { // Added HowTo
      "@type": "HowTo",
      "name": "How to Encode/Decode URLs",
      "step": [
        {
          "@type": "HowToStep",
          "text": "Enter your URL or text in the input box",
          "name": "Input text"
        },
        {
          "@type": "HowToStep",
          "text": "Select 'Encode' to convert special characters to percent-encoding or 'Decode' to convert encoded characters back",
          "name": "Choose operation"
        },
        {
          "@type": "HowToStep",
          "text": "View the results in the output box",
          "name": "Get results"
        },
        {
          "@type": "HowToStep",
          "text": "Copy the processed text using the copy button",
          "name": "Copy results"
        }
      ]
    }
  }

  // ✅ FAQ Schema (separate)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is URL encoding/percent-encoding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "URL encoding converts special characters in a URL to a % followed by two hexadecimal digits. This ensures URLs transmit correctly across the internet, as some characters have special meanings in URLs."
        }
      },
      {
        "@type": "Question",
        "name": "When should I URL encode a string?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You should encode URL parameters, query strings, and any text that will be used in a URL that contains spaces or special characters like ?, &, =, +, or non-ASCII characters."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between encodeURI and encodeURIComponent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "encodeURI is for complete URLs and doesn't encode reserved characters like :, /, ?, #. encodeURIComponent is for URL components and encodes these characters. Our tool handles both cases automatically."
        }
      }
    ]
  }

  return (
    <>
      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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