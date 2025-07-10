import RemoveDuplicateLinesTool from '@/components/RemoveDuplicateLinesTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines Tool - Clean & Deduplicate Text Online | TextToolsPro',
  description: 'Free online tool to remove duplicate lines from text, code, or data. Clean lists, logs, and documents while preserving original formatting. Process up to 100,000 lines instantly.',
  keywords: [
    'remove duplicate lines',
    'delete repeated lines',
    'text cleaner',
    'duplicate line remover',
    'deduplicate text',
    'clean text online',
    'remove repeated lines',
    'line deduplicator',
    'text processing tool',
    'data cleaning tool',
    'unique lines extractor',
    'online text cleaner'
  ].join(', '),
  openGraph: {
    title: 'Remove Duplicate Lines Tool - Clean & Deduplicate Text Online | TextToolsPro',
    description: 'Free online tool to remove duplicate lines from text, code, or data while preserving original formatting.',
    url: 'https://www.texttoolspro.com/remove-duplicate-lines',
    type: 'website',
    locale: 'en_US',
    siteName: 'TextToolsPro',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/remove-duplicates-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Remove Duplicate Lines Tool - Clean your text online'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remove Duplicate Lines Tool - Clean & Deduplicate Text Online | TextToolsPro',
    description: 'Free online tool to remove duplicate lines from text, code, or data while preserving original formatting.',
    images: [
      {
        url: 'https://www.texttoolspro.com/images/remove-duplicates-twitter.jpg',
        width: 1200,
        height: 628,
        alt: 'Remove Duplicate Lines Tool - Clean your text online'
      }
    ]
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/remove-duplicate-lines'
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

export default function RemoveDuplicateLinesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Remove Duplicate Lines Tool",
    "url": "https://www.texttoolspro.com/remove-duplicate-lines",
    "description": "Free online tool to remove duplicate lines from text documents, code files, and data sets while preserving original formatting.",
    "applicationCategory": ["DataCleaningApplication", "WebApplication"],
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
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "potentialAction": {
      "@type": "HowTo",
      "name": "How to Remove Duplicate Lines",
      "description": "Step-by-step guide to clean text by removing duplicate lines",
      "step": [
        {
          "@type": "HowToStep",
          "text": "Paste your text with duplicate lines into the input box",
          "name": "Input text"
        },
        {
          "@type": "HowToStep",
          "text": "Select processing options (case sensitivity, whitespace handling, etc.)",
          "name": "Set options"
        },
        {
          "@type": "HowToStep",
          "text": "Click 'Remove Duplicates' to clean your text",
          "name": "Process text"
        },
        {
          "@type": "HowToStep",
          "text": "View statistics showing duplicates removed",
          "name": "Review results"
        },
        {
          "@type": "HowToStep",
          "text": "Copy the cleaned text using the 'Copy to Clipboard' button",
          "name": "Get results"
        }
      ]
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does this tool work with large files?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the tool can process up to 100,000 lines of text (approximately 2MB). For extremely large files, we recommend processing in chunks. The tool shows real-time statistics about the processing."
          }
        },
        {
          "@type": "Question",
          "name": "How are blank lines handled?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With 'Preserve blank lines' enabled, empty lines are kept in the output. When disabled, all blank lines are removed regardless of duplicates. This helps maintain document structure when needed."
          }
        },
        {
          "@type": "Question",
          "name": "Can I remove duplicates but keep one copy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the tool always keeps the first occurrence of each unique line and removes subsequent duplicates. You can also enable 'Show duplicate counts' to see how many times each line appeared originally."
          }
        },
        {
          "@type": "Question",
          "name": "Does the tool modify my original text formatting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, the original formatting (capitalization, spacing) of kept lines is preserved unless you enable options to ignore case or whitespace. The tool is designed to clean your text while maintaining its integrity."
          }
        },
        {
          "@type": "Question",
          "name": "What types of text can I process with this tool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The tool works with any plain text including: code files, log files, CSV data, lists, inventories, mailing lists, survey responses, and any document with line-based content. It's particularly useful for data cleaning and preparation."
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
            { label: 'Remove Duplicate Lines', href: '/remove-duplicate-lines' }
          ]}
        />
      </div>
      <RemoveDuplicateLinesTool />
      {/* SEO hidden synonyms */}
      <div hidden aria-hidden="true">
        Also known as: line deduplicator, repeated line remover, text cleaner tool, 
        duplicate line filter, online text processor, unique lines extractor, 
        text normalization tool, data cleaning utility, line-based deduplication
      </div>
    </>
  )
}