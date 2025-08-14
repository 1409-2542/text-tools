import LoremIpsumGenerator from '@/components/LoremIpsumGenerator'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Create Placeholder Text Online | TextToolsPro',
  description: 'Free online tool to generate Lorem Ipsum placeholder text for your designs and mockups. Customize length, paragraphs, and format (words, sentences, or paragraphs).',
  keywords: [ // Changed from string to array format
    'lorem ipsum',
    'placeholder text',
    'dummy text',
    'text generator',
    'design mockups',
    'lorem ipsum generator',
    'filler text',
    'mockup text',
    'web design text',
    'print design text',
    'random text generator',
    'latin text generator'
  ],
  openGraph: {
    title: 'Lorem Ipsum Generator - Create Placeholder Text Online | TextToolsPro',
    description: 'Free online tool to generate Lorem Ipsum placeholder text for your designs and mockups. Customize length and format.',
    url: 'https://www.texttoolspro.com/lorem-ipsum-generator',
    type: 'website', // Added missing type
    locale: 'en_US', // Added locale
    siteName: 'TextToolsPro', // Added siteName
    images: [ // Changed to array format
      {
        url: 'https://www.texttoolspro.com/images/lorem-ipsum-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lorem Ipsum Generator Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image', // Added card type
    title: 'Lorem Ipsum Generator - Create Placeholder Text Online | TextToolsPro',
    description: 'Free online tool to generate Lorem Ipsum placeholder text for your designs and mockups. Customize length and format.',
    images: [ // Changed to array format
      {
        url: 'https://www.texttoolspro.com/images/lorem-ipsum-twitter.jpg',
        width: 1200,
        height: 628,
        alt: 'Lorem Ipsum Generator Tool'
      }
    ],
    creator: '@TextToolsPro' // Added Twitter handle if available
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/lorem-ipsum-generator'
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

export default function LoremIpsumGeneratorPage() {
  // ✅ WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lorem Ipsum Generator",
    "url": "https://www.texttoolspro.com/lorem-ipsum-generator",
    "description": "Free online tool to generate customizable Lorem Ipsum placeholder text for design mockups and prototypes",
    "applicationCategory": ["DesignApplication", "WebApplication"],
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
    "potentialAction": { // Added potential action
      "@type": "HowTo",
      "name": "How to Generate Lorem Ipsum Text",
      "step": [
        {
          "@type": "HowToStep",
          "text": "Select your preferred output format (paragraphs, sentences, or words)"
        },
        {
          "@type": "HowToStep",
          "text": "Choose the amount of text you need"
        },
        {
          "@type": "HowToStep",
          "text": "Click 'Generate' to create your placeholder text"
        },
        {
          "@type": "HowToStep",
          "text": "Copy the results to your clipboard"
        }
      ]
    }
  }

  // ✅ FAQ Schema (separate)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Lorem Ipsum text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lorem Ipsum is standard dummy text used in the printing and design industries since the 1500s. It comes from a Latin text by Cicero, but is scrambled and doesn't make actual sense."
        }
      },
      {
        "@type": "Question",
        "name": "Why use Lorem Ipsum instead of regular text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Designers use Lorem Ipsum because it provides realistic text distribution without distracting with meaningful content. This helps focus on visual design elements."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize the length of the generated text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our generator lets you specify exact word counts, paragraph counts, or sentence counts to match your design needs."
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
            { label: 'Lorem Ipsum Generator', href: '/lorem-ipsum-generator' }
          ]}
        />
      </div>
      <LoremIpsumGenerator />
    </>
  )
}