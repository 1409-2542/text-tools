import WordCounterTool from '@/components/WordCounterTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Word Counter Tool Online - Count Words & Characters Instantly | TextToolsPro',
  description: 'Free online word counter tool that instantly counts words, characters (with/without spaces), sentences, and paragraphs. Perfect for essays, SEO content & social media.',
  keywords: [
    'word counter',
    'character counter',
    'count words',
    'text word counter',
    'word count checker',
    'words count',
    'word counting',
    'word counter tool',
    'word count machine',
    'count words in text',
    'word counter online',
    'online word counter',
    'word calculator',
    'word number counter',
    'word counter generator',
    'text counter',
    'text count',
    'paragraph word counter',
    'essay word counter',
    'word length counter',
    'word count calculator'
  ],
  openGraph: {
    title: 'Word Counter Tool Online - Count Words & Characters Instantly | TextToolsPro',
    description: 'Accurately count words, characters (with/without spaces) with our free online word counter. Works for essays, blogs, social media & SEO content.',
    url: 'https://www.texttoolspro.com/word-counter',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/word-counter-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Word Counter Tool',
      },
    ],
    siteName: 'TextToolsPro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter Tool Online - Count Words & Characters Instantly | TextToolsPro',
    description: 'Free online word counter that instantly analyzes your text for word count, character count (with/without spaces) and more.',
    images: ['https://www.texttoolspro.com/images/word-counter-twitter.jpg'],
    site: '@TextToolsPro',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/word-counter'
  }
}

export default function WordCounterPage() {
  // ✅ 1. WebApplication Schema (separate script)
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter Tool Online",
    "url": "https://www.texttoolspro.com/word-counter",
    "description": "Free online tool to count words, characters (with and without spaces), sentences and paragraphs in any text",
    "applicationCategory": "WritingApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "TextToolsPro"
    },
    "keywords": "word counter, character counter, count words, text word counter, word count checker"
  };

  // ✅ 3. Breadcrumb Schema (separate script)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.texttoolspro.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Text Tools",
        "item": "https://www.texttoolspro.com/#tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Word Counter",
        "item": "https://www.texttoolspro.com/word-counter"
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

      {/* ✅ 3. Breadcrumb Schema (now separate) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Text Tools', href: '/#tools' },
            { label: 'Word Counter', href: '/word-counter' }
          ]}
        />
      </div>
      <WordCounterTool />
    </>
  )
}
