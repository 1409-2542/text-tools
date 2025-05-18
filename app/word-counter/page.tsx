import WordCounterTool from '@/components/WordCounterTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Word Counter Tool - Count Words & Characters Online | TextToolsPro',
  description: 'Free online word counter tool that instantly counts words, characters, sentences, and paragraphs in your text.',
  keywords: 'word counter, character counter, sentence counter, paragraph counter',
  openGraph: {
    title: 'Word Counter Tool - Count Words & Characters Online | TextToolsPro',
    description: 'Free online word counter tool that instantly counts words, characters, sentences, and paragraphs in your text.',
    url: 'https://www.texttoolspro.com/word-counter',
    images: 'https://www.texttoolspro.com/images/word-counter-og.jpg',
  },
  twitter: {
    title: 'Word Counter Tool - Count Words & Characters Online | TextToolsPro',
    description: 'Free online word counter tool that instantly counts words, characters, sentences, and paragraphs in your text.',
    images: 'https://www.texttoolspro.com/images/word-counter-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/word-counter'
  }
}

export default function WordCounterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter Tool",
    "url": "https://www.texttoolspro.com/word-counter",
    "description": "Free online tool to count words, characters, sentences and paragraphs in text",
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
            { label: 'Word Counter', href: '/word-counter' }
          ]}
        />
      </div>
      <WordCounterTool />
    </>
  )
}