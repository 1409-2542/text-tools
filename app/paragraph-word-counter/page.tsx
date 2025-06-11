import ParagraphWordCounter from '@/components/ParagraphWordCounter'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paragraph Word Counter | TextToolsPro',
  description: 'Free online tool to count words, characters, sentences, and paragraphs in your text.',
  keywords: 'paragraph word counter, word count tool, character counter, sentence counter',
  openGraph: {
    title: 'Paragraph Word Counter | TextToolsPro',
    description: 'Free online tool to count words, characters, sentences, and paragraphs in your text.',
    url: 'https://www.texttoolspro.com/paragraph-word-counter',
    images: 'https://www.texttoolspro.com/images/word-counter-og.jpg',
  },
  twitter: {
    title: 'Paragraph Word Counter | TextToolsPro',
    description: 'Free online tool to count words, characters, sentences, and paragraphs in your text.',
    images: 'https://www.texttoolspro.com/images/word-counter-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/paragraph-word-counter'
  }
}

export default function ParagraphWordCounterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Paragraph Word Counter",
    "url": "https://www.texttoolspro.com/paragraph-word-counter",
    "description": "Free online tool to count words, characters, sentences, and paragraphs in any text",
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
            { label: 'Text Tools', href: '/text-tools' },
            { label: 'Paragraph Word Counter', href: '/paragraph-word-counter' }
          ]}
        />
      </div>
      <ParagraphWordCounter />
    </>
  )
}