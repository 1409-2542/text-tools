import TextReverserTool from '@/components/TextReverserTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Reverser Tool - Flip & Reverse Text Online | TextToolsPro',
  description: 'Free online tool to reverse text, words, or lines. Create backwards text for coding, design, social media, or secret messages. No registration required.',
  keywords: [ // Changed from .join(', ') to array format
    'text reverser',
    'reverse text generator',
    'backwards text converter',
    'word reverser',
    'flip text',
    'mirror text',
    'reverse string',
    'text inverter',
    'online text tools',
    'text manipulation',
    'reverse writing',
    'text flipper',
    'string inverter',
    'palindrome generator'
  ],
  openGraph: {
    title: 'Text Reverser Tool - Flip & Reverse Text Online | TextToolsPro',
    description: 'Free online tool to reverse text, words, or lines. Perfect for coding, design, and creative projects.',
    url: 'https://www.texttoolspro.com/text-reverser',
    type: 'website',
    locale: 'en_US',
    siteName: 'TextToolsPro',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/text-reverser-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Text Reverser Tool - Flip and Reverse Text Online'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Reverser Tool - Flip & Reverse Text Online | TextToolsPro',
    description: 'Free online tool to reverse text, words, or lines. Perfect for coding, design, and creative projects.',
    images: ['https://www.texttoolspro.com/images/text-reverser-twitter.jpg'], // Simplified to URL string
    creator: '@TextToolsPro' // Added if you have a Twitter account
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/text-reverser'
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

export default function TextReverserPage() {
  // ✅ 1. WebApplication Schema (separate)
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Reverser Tool",
    "url": "https://www.texttoolspro.com/text-reverser",
    "description": "Free online tool to reverse text, reverse each word's letters, or reverse line order. Perfect for coding, design, and creative projects.",
    "applicationCategory": ["UtilitiesApplication", "WebApplication"],
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
      "ratingValue": "4.7",
      "reviewCount": "89",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // ✅ 2. HowTo Schema (separate)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use the Text Reverser Tool",
    "description": "Step-by-step guide to reverse text online",
    "step": [
      {
        "@type": "HowToStep",
        "text": "Enter your text in the input box",
        "name": "Input text"
      },
      {
        "@type": "HowToStep",
        "text": "Select reversal type: entire text, words, or lines",
        "name": "Choose reversal option"
      },
      {
        "@type": "HowToStep",
        "text": "Toggle 'Preserve spacing' if needed",
        "name": "Set spacing preference"
      },
      {
        "@type": "HowToStep",
        "text": "Click 'Reverse Text' to transform your text",
        "name": "Reverse text"
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
        "name": "Does text reversal work with different languages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our text reverser works with any language and character set. It properly handles right-to-left languages, special characters, and emojis, preserving their order within the reversed text."
        }
      },
      {
        "@type": "Question",
        "name": "Can I reverse text with formatting (bold, italics, etc.)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The tool reverses plain text only. For formatted text (like HTML or Markdown), the formatting tags will be reversed along with the content. For best results, reverse the text first and then apply formatting."
        }
      },
      {
        "@type": "Question",
        "name": "What are some practical uses for reversed text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reversed text has many uses including: testing font rendering, creating mirror writing for designs, developing secret codes, checking symmetrical layouts, language learning exercises, and creating unique social media posts."
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
            { label: 'Text Reverser', href: '/text-reverser' }
          ]}
        />
      </div>
      <TextReverserTool />
      
      {/* SEO hidden synonyms - improved with semantic structure */}
      <div hidden aria-hidden="true">
        <h2>Text Reverser Synonyms</h2>
        <p>
          Also known as: backwards text generator, mirror text maker, string reverser, 
          text inverter, flip text creator, reverse writing tool, online text reverser, 
          word flipper, letter reverser, palindrome creator, text mirroring tool,
          reverse character order, text flip utility
        </p>
      </div>
    </>
  )
}