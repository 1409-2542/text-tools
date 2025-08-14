import TextToSlugConverter from '@/components/TextToSlugConverter'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text to Slug Converter - Create SEO-Friendly URLs | TextToolsPro',
  description: 'Free online tool to convert text into clean, SEO-friendly URL slugs for websites and blogs. Supports multiple languages, custom separators, and case options.',
  keywords: [ // Changed to array format
    'slug generator',
    'URL slug',
    'text to slug',
    'SEO friendly URL',
    'URL converter',
    'slug converter',
    'URL slug generator',
    'string to slug',
    'title to URL',
    'SEO slug maker',
    'web address converter',
    'permalink generator'
  ],
  openGraph: {
    title: 'Text to Slug Converter - Create SEO-Friendly URLs | TextToolsPro',
    description: 'Convert text into perfect URL slugs with our free online tool. Supports custom separators, case options, and multilingual characters.',
    url: 'https://www.texttoolspro.com/text-to-slug',
    type: 'website',
    locale: 'en_US',
    siteName: 'TextToolsPro',
    images: [ // Changed to array format
      {
        url: 'https://www.texttoolspro.com/images/text-to-slug-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Text to Slug Converter Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text to Slug Converter - Create SEO-Friendly URLs | TextToolsPro',
    description: 'Free online tool to convert text into clean, SEO-friendly URL slugs for websites and blogs.',
    images: [ // Changed to array format
      {
        url: 'https://www.texttoolspro.com/images/text-to-slug-twitter.jpg',
        width: 1200,
        height: 628,
        alt: 'Text to Slug Converter Tool'
      }
    ],
    creator: '@TextToolsPro' // Added if available
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/text-to-slug'
  },
  robots: { // Added robots configuration
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

export default function TextToSlugPage() {
  // ✅ WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text to Slug Converter",
    "url": "https://www.texttoolspro.com/text-to-slug",
    "description": "Free online tool to convert text into SEO-friendly URL slugs with customizable options",
    "applicationCategory": ["WebDevelopmentApplication", "SEOApplication"],
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
    "potentialAction": { // Added HowTo instructions
      "@type": "HowTo",
      "name": "How to Convert Text to URL Slug",
      "step": [
        {
          "@type": "HowToStep",
          "text": "Enter your text in the input field (e.g., 'How to Make Perfect Pancakes')"
        },
        {
          "@type": "HowToStep",
          "text": "Choose your preferred settings (separator, case, etc.)"
        },
        {
          "@type": "HowToStep",
          "text": "Click 'Convert to Slug' button"
        },
        {
          "@type": "HowToStep",
          "text": "Copy the generated slug (e.g., 'how-to-make-perfect-pancakes')"
        }
      ]
    }
  }

  // ✅ FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes a good URL slug for SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Good slugs are concise, use relevant keywords, separate words with hyphens, and avoid special characters. Keep them under 60 characters when possible."
        }
      },
      {
        "@type": "Question",
        "name": "Does the converter handle non-English characters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our tool properly converts accented and special characters to their ASCII equivalents (e.g., 'é' becomes 'e')."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use underscores or hyphens in URLs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Always use hyphens (-) as word separators. Search engines treat hyphens as spaces, while underscores connect words."
        }
      },
      {
        "@type": "Question",
        "name": "Does the tool preserve capital letters in slugs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By default, we recommend lowercase slugs for consistency, but you can choose to preserve capitals if needed."
        }
      }
    ]
  }

  return (
    <>
      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Text Tools', href: '/#tools' },
            { label: 'Text to Slug', href: '/text-to-slug' }
          ]}
        />
      </div>
      <TextToSlugConverter />
    </>
  )
}