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
  ].join(', '),
  openGraph: {
    title: 'Word Counter Tool Online - Count Words & Characters Instantly | TextToolsPro',
    description: 'Accurately count words, characters (with/without spaces) with our free online word counter. Works for essays, blogs, social media & SEO content.',
    url: 'https://www.texttoolspro.com/word-counter',
    images: 'https://www.texttoolspro.com/images/word-counter-og.jpg',
  },
  twitter: {
    title: 'Word Counter Tool Online - Count Words & Characters Instantly | TextToolsPro',
    description: 'Free online word counter that instantly analyzes your text for word count, character count (with/without spaces) and more.',
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does this word counter tool work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our tool analyzes your text in real-time, counting words (groups of characters separated by whitespace), characters (including or excluding spaces), and more. Simply paste or type your text to get instant results."
          }
        },
        {
          "@type": "Question",
          "name": "Can I count words in a specific section of text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Just highlight the text you want to analyze, and our tool will show counts for only the selected portion. This is perfect for checking paragraph length or specific sections."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between character count with and without spaces?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Character count with spaces includes all characters (letters, numbers, punctuation, and spaces). Character count without spaces excludes spaces, which is useful for platforms with strict character limits."
          }
        },
        {
          "@type": "Question",
          "name": "Is this word counter accurate for academic work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our counter matches standard word processors like Microsoft Word and Google Docs. For precise academic requirements, we recommend verifying with your institution's specific guidelines."
          }
        },
        {
          "@type": "Question",
          "name": "Does the tool work with right-to-left languages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our word counter supports right-to-left languages (like Arabic and Hebrew) and will accurately count words and characters in these languages."
          }
        }
      ]
    },
    {
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