import TextDiffTool from '@/components/TextDiffTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Diff Tool - Compare & Find Differences Online | TextToolsPro',
  description: 'Free online tool to compare two texts and highlight differences with precision. Perfect for code review, document version control, and content analysis. Supports character, word, and line comparison.',
  keywords: [
    'text diff',
    'compare text online',
    'difference checker',
    'text comparison tool',
    'online diff checker',
    'code comparison tool',
    'document diff',
    'text version comparison',
    'find text differences',
    'content comparison',
    'side by side text comparison',
    'text change detector'
  ].join(', '),
  openGraph: {
    title: 'Text Diff Tool - Compare & Find Differences Online | TextToolsPro',
    description: 'Free online tool to compare two texts and highlight differences with precision. Perfect for code review, document version control, and content analysis.',
    url: 'https://www.texttoolspro.com/text-diff',
    type: 'website',
    locale: 'en_US',
    siteName: 'TextToolsPro',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/text-diff-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Text Diff Tool - Compare and find differences between texts'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Diff Tool - Compare & Find Differences Online | TextToolsPro',
    description: 'Free online tool to compare two texts and highlight differences with precision. Perfect for code review, document version control, and content analysis.',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/text-diff-twitter.jpg',
        width: 1200,
        height: 628,
        alt: 'Text Diff Tool - Compare and find differences between texts'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/text-diff'
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

export default function TextDiffPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Diff Tool",
    "url": "https://www.texttoolspro.com/text-diff",
    "description": "Free online tool to compare two texts and highlight differences between them with character-level precision. Supports multiple comparison modes and options.",
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
      "reviewCount": "215",
      "bestRating": "5",
      "worstRating": "1"
    },
    "potentialAction": {
      "@type": "HowTo",
      "name": "How to Use the Text Diff Tool",
      "description": "Step-by-step guide to compare texts and find differences",
      "step": [
        {
          "@type": "HowToStep",
          "text": "Enter your original text in the left panel",
          "name": "Input original text"
        },
        {
          "@type": "HowToStep",
          "text": "Enter your modified text in the right panel",
          "name": "Input modified text"
        },
        {
          "@type": "HowToStep",
          "text": "Select comparison mode (character, word, or line level)",
          "name": "Choose comparison mode"
        },
        {
          "@type": "HowToStep",
          "text": "Set additional options (ignore case, ignore whitespace)",
          "name": "Configure options"
        },
        {
          "@type": "HowToStep",
          "text": "View the highlighted differences and statistics",
          "name": "Analyze results"
        }
      ]
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of text can I compare with this tool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can compare any plain text including code, documents, essays, configuration files, JSON, XML, CSV data, and more. The tool works with all languages and character sets."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between character, word, and line comparison modes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Character mode highlights individual character changes, word mode shows whole word differences, and line mode compares entire lines. Choose character for precise changes, word for natural language, and line for structured documents."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a limit to how much text I can compare?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The tool can compare documents up to 100,000 characters each (about 15-20 pages). For larger files, consider splitting them into smaller sections."
          }
        },
        {
          "@type": "Question",
          "name": "Does the tool store my compared texts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your sensitive documents."
          }
        },
        {
          "@type": "Question",
          "name": "Can I compare more than two documents at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The current version compares two documents at a time. For comparing multiple versions, you can perform pairwise comparisons sequentially."
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
            { label: 'Developer Tools', href: '/#tools' },
            { label: 'Text Diff', href: '/text-diff' }
          ]}
        />
      </div>
      <TextDiffTool />
      {/* SEO hidden synonyms */}
      <div hidden aria-hidden="true">
        Also known as: text comparison tool, difference checker, document diff, 
        text version comparator, online diff checker, text change detector, 
        side-by-side text comparison, content comparison tool, text revision analyzer
      </div>
    </>
  )
}