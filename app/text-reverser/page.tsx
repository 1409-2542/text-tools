import TextReverserTool from '@/components/TextReverserTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Reverser Tool - Flip & Reverse Text Online | TextToolsPro',
  description: 'Free online tool to reverse text, words, or lines. Create backwards text for coding, design, social media, or secret messages. No registration required.',
  keywords: [
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
    'text flipper'
  ].join(', '),
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
    images: [
      {
        url: 'https://www.texttoolspro.com/images/text-reverser-twitter.jpg',
        width: 1200,
        height: 628,
        alt: 'Text Reverser Tool - Flip and Reverse Text Online'
      }
    ]
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
  const structuredData = {
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
    },
    "potentialAction": {
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
    },
    "mainEntity": {
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
          "name": "Is there a limit to how much text I can reverse?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reverse up to 100,000 characters at once (about 15,000-20,000 words). For larger texts, consider breaking them into smaller sections. Performance may vary based on your device capabilities."
          }
        },
        {
          "@type": "Question",
          "name": "Does the tool store my text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content. This also means your conversions are faster as there's no network delay."
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
            { label: 'Text Reverser', href: '/text-reverser' }
          ]}
        />
      </div>
      <TextReverserTool />
      {/* SEO hidden synonyms */}
      <div hidden aria-hidden="true">
        Also known as: backwards text generator, mirror text maker, string reverser, 
        text inverter, flip text creator, reverse writing tool, online text reverser, 
        word flipper, letter reverser, palindrome creator
      </div>
    </>
  )
}