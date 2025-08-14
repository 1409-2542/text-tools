import RemoveDuplicateLinesTool from '@/components/RemoveDuplicateLinesTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines Tool - Clean & Deduplicate Text Online | TextToolsPro',
  description: 'Free online tool to remove duplicate lines from text, code, or data. Clean lists, logs, and documents while preserving original formatting. Process up to 100,000 lines instantly.',
  keywords: [ // Changed from .join(', ') to array format
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
    'online text cleaner',
    'duplicate line filter',
    'text normalization'
  ],
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
    images: ['https://www.texttoolspro.com/images/remove-duplicates-twitter.jpg'], // Simplified to URL string
    site: '@TextToolsPro' // Added if you have a Twitter account
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
  // ✅ 1. WebApplication Schema (separate)
  const webAppSchema = {
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
    }
  };

  // ✅ 2. HowTo Schema (separate)
  const howToSchema = {
    "@context": "https://schema.org",
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
  };

  // ✅ 3. FAQ Schema (separate)
  const faqSchema = {
    "@context": "https://schema.org",
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
            { label: 'Remove Duplicate Lines', href: '/remove-duplicate-lines' }
          ]}
        />
      </div>
      <RemoveDuplicateLinesTool />
      
      {/* SEO hidden synonyms - improved with semantic structure */}
      <div hidden aria-hidden="true">
        <h2>Remove Duplicate Lines Synonyms</h2>
        <p>
          Also known as: line deduplicator, repeated line remover, text cleaner tool, 
          duplicate line filter, online text processor, unique lines extractor, 
          text normalization tool, data cleaning utility, line-based deduplication,
          duplicate text cleaner, repeated text remover
        </p>
      </div>
    </>
  )
}