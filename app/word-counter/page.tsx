import WordCounterTool from '@/components/WordCounterTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Word Counter Tool - Instantly Count Words & Characters | TextToolsPro',
  description: 'Use our free, fast, and accurate online word counter to count words, characters, sentences, and paragraphs instantly. Perfect for writers, students, and professionals.',
  keywords: 'word counter, character counter, sentence counter, paragraph counter, online word count tool, text analysis',
  openGraph: {
    title: 'Word Counter Tool - Instantly Count Words & Characters | TextToolsPro',
    description: 'Accurately count words, characters, sentences, and paragraphs with our free online word counter. Simple, fast, and privacy-friendly.',
    url: 'https://www.texttoolspro.com/word-counter',
    images: 'https://www.texttoolspro.com/images/word-counter-og.jpg',
  },
  twitter: {
    title: 'Word Counter Tool - Instantly Count Words & Characters | TextToolsPro',
    description: 'Free and accurate online word counter. Instantly analyze your text for word count, character count, sentences, and paragraphs.',
    images: 'https://www.texttoolspro.com/images/word-counter-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/word-counter'
  }
}

export default function WordCounterPage() {
  const structuredData = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does the word counter work with different languages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our word counter works with any language that uses spaces between words. For languages without spaces (like Chinese or Japanese), the tool will count each character as a word."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is the word counter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our word counter is highly accurate and matches the counting methods used by most word processors like Microsoft Word and Google Docs. For precise academic or professional requirements, we recommend verifying with your specific style guide."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a limit to how much text I can analyze?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can analyze up to 100,000 characters at once, which is approximately 15,000-20,000 words. For most users, this is more than sufficient."
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
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Word Counter Tool",
    "url": "https://www.texttoolspro.com/word-counter",
    "description": "Our free online word counter provides instant analysis of your text, giving you accurate counts of words, characters, sentences, and paragraphs. Useful for writers, students, SEO specialists, social media managers, and translators.",
    "about": {
      "@type": "Thing",
      "name": "Text analysis and word counting"
    }
  }
];

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