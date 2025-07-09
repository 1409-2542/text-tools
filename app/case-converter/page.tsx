import CaseConverterTool from '@/components/CaseConverterTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Converter Tool - Change Text Case Online | TextToolsPro',
  description: 'Free online case converter tool to transform text between uppercase, lowercase, title case, sentence case, alternating case and more. Perfect for writers, programmers, and content creators.',
  keywords: [
    'case converter',
    'text case converter',
    'uppercase converter',
    'lowercase converter',
    'title case generator',
    'sentence case converter',
    'text formatter',
    'capitalize text',
    'online text tools',
    'text formatting',
    'string case converter',
    'capital letters converter'
  ].join(', '),
  openGraph: {
    title: 'Case Converter Tool - Change Text Case Online | TextToolsPro',
    description: 'Free online tool to convert text between different cases instantly. Perfect for formatting documents, code, and web content.',
    url: 'https://www.texttoolspro.com/case-converter',
    type: 'website',
    locale: 'en_US',
    siteName: 'TextToolsPro',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/case-converter-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Case Converter Tool - Transform text between different cases'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter Tool - Change Text Case Online | TextToolsPro',
    description: 'Free online tool to convert text between different cases instantly. Perfect for formatting documents, code, and web content.',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/case-converter-twitter.jpg',
        width: 1200,
        height: 628,
        alt: 'Case Converter Tool - Transform text between different cases'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/case-converter'
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
}

export default function CaseConverterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Case Converter Tool",
    "url": "https://www.texttoolspro.com/case-converter",
    "description": "Free online tool to convert text between different cases (uppercase, lowercase, title case, sentence case, alternating case and more)",
    "applicationCategory": ["WritingApplication", "WebApplication"],
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
      "ratingValue": "4.8",
      "reviewCount": "215",
      "bestRating": "5",
      "worstRating": "1"
    },
    "potentialAction": {
      "@type": "HowTo",
      "name": "How to use the Case Converter Tool",
      "description": "Step-by-step guide to convert text between different cases",
      "step": [
        {
          "@type": "HowToStep",
          "text": "Enter your text in the input box",
          "name": "Input text"
        },
        {
          "@type": "HowToStep",
          "text": "Select your desired case conversion option",
          "name": "Choose case type"
        },
        {
          "@type": "HowToStep",
          "text": "Click 'Convert Case' button to transform your text",
          "name": "Convert text"
        },
        {
          "@type": "HowToStep",
          "text": "Copy the result using the 'Copy to Clipboard' button",
          "name": "Get results"
        }
      ]
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What's the difference between Title Case and Capitalized Case?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Title Case follows standard title capitalization rules where certain small words (like 'a', 'and', 'the') remain lowercase unless they're the first word. Capitalized Case capitalizes the first letter of every word regardless of the word's role in the sentence."
          }
        },
        {
          "@type": "Question",
          "name": "Does the case converter work with different languages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our case converter works with any language that uses the Latin alphabet. For languages with special characters (like German umlauts or Spanish accents), the conversion will preserve these characters while changing their case."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a limit to how much text I can convert?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can convert up to 100,000 characters at once, which is approximately 15,000-20,000 words. For most users, this is more than sufficient."
          }
        },
        {
          "@type": "Question",
          "name": "Does the tool store my text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content."
          }
        }
      ]
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
            { label: 'Text Tools', href: '/text-tools' },
            { label: 'Case Converter', href: '/case-converter' }
          ]}
        />
      </div>
      <CaseConverterTool />
      {/* SEO hidden synonyms */}
      <div hidden aria-hidden="true">
        Also known as: text case changer, letter case converter, uppercase lowercase tool, 
        capital letter converter, sentence formatter, title case maker, string case transformer, 
        capitalization tool, online text case converter
      </div>
    </>
  )
}