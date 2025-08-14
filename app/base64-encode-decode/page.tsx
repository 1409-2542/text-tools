import Base64Tool from '@/components/Base64Tool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder - Online Tool | TextToolsPro',
  description: 'Free online Base64 encoder and decoder tool. Convert text, files, and binary data to Base64 format and decode back to original. Fast, secure, and no data leaves your browser.',
  keywords: [ // ✅ Array format (better for SEO)
    'base64 encode',
    'base64 decode',
    'base64 converter',
    'online base64 tool',
    'text to base64',
    'file to base64',
    'base64 to text',
    'base64 encoding',
    'base64 decoding',
    'data url generator',
    'binary to text',
    'base64 string converter'
  ],
  openGraph: {
    title: 'Base64 Encoder & Decoder - Online Tool | TextToolsPro',
    description: 'Free online Base64 encoder and decoder tool. Convert text, files, and binary data to Base64 format and decode back to original.',
    url: 'https://www.texttoolspro.com/base64-encode-decode',
    type: 'website',
    locale: 'en_US',
    siteName: 'TextToolsPro',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/base64-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Base64 Encoder and Decoder Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64 Encoder & Decoder - Online Tool | TextToolsPro',
    description: 'Free online Base64 encoder and decoder tool. Convert text, files, and binary data to Base64 format and decode back to original.',
    images: ['https://www.texttoolspro.com/images/base64-twitter.jpg'] // ✅ URL string (not object)
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/base64-encode-decode'
  },
  robots: {
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
  // ❌ Removed verification (use only if you have actual codes)
}

export default function Base64Page() {
  // ✅ 1. WebApplication Schema (standalone)
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 Encoder & Decoder Tool",
    "url": "https://www.texttoolspro.com/base64-encode-decode",
    "description": "Free online tool to encode text or files to Base64 and decode Base64 strings back to original format. Works entirely in your browser for maximum privacy.",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "http://schema.org/UseAction",
      "userInteractionCount": "10000"
    }
  };

  // ✅ 2. HowTo Schema (separate)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to use Base64 Encoder/Decoder",
    "description": "Step-by-step guide to encode and decode Base64",
    "step": [
      {
        "@type": "HowToStep",
        "text": "Select the 'Text' or 'File' tab depending on what you want to encode/decode",
        "name": "Choose input type"
      },
      {
        "@type": "HowToStep",
        "text": "For text: Enter your text in the input box. For files: Upload your file",
        "name": "Input your content"
      },
      {
        "@type": "HowToStep",
        "text": "Click 'Encode to Base64' or 'Decode from Base64' button",
        "name": "Process content"
      },
      {
        "@type": "HowToStep",
        "text": "Copy the result using the 'Copy to Clipboard' button",
        "name": "Get results"
      }
    ]
  };

  // ✅ 3. FAQ Schema (separate)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Base64 encoding used for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Base64 is commonly used to encode binary data (like images or files) into ASCII characters for safe transport over systems designed to handle text, such as email or JSON APIs. It ensures that the data remains intact without modification during transport."
        }
      },
      {
        "@type": "Question",
        "name": "Is Base64 encoding secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Base64 is not encryption and provides no security. It's simply an encoding scheme that makes binary data safe to transmit through text-based systems. Anyone can decode Base64 data back to its original form."
        }
      },
      {
        "@type": "Question",
        "name": "What's the maximum file size I can encode?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our tool currently supports files up to 10MB in size. For larger files, consider using desktop software or command-line tools."
        }
      },
      {
        "@type": "Question",
        "name": "Does the tool store my files or text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, all processing happens in your browser. We never send your files or text to our servers, ensuring complete privacy for your data."
        }
      }
    ]
  };

  return (
    <>
      {/* ✅ 1. WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* ✅ 2. HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ✅ 3. FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Text Tools', href: '/#tools' },
            { label: 'Base64 Encode/Decode', href: '/base64-encode-decode' }
          ]}
        />
      </div>
      <Base64Tool />
    </>
  )
}