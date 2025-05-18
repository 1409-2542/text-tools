import TextReverserTool from '@/components/TextReverserTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Reverser Tool - Flip & Reverse Text Online | TextToolsPro',
  description: 'Free online tool to reverse your text or reverse each word\'s letters. Create backwards text for fun or testing purposes.',
  keywords: 'text reverser, reverse text, backwards text, word reverser, flip text',
  openGraph: {
    title: 'Text Reverser Tool - Flip & Reverse Text Online | TextToolsPro',
    description: 'Free online tool to reverse your text or reverse each word\'s letters.',
    url: 'https://www.text-tools-pro.com/text-reverser',
    images: 'https://www.text-tools-pro.com/images/text-reverser-og.jpg',
  },
  twitter: {
    title: 'Text Reverser Tool - Flip & Reverse Text Online | TextToolsPro',
    description: 'Free online tool to reverse your text or reverse each word\'s letters.',
    images: 'https://www.text-tools-pro.com/images/text-reverser-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.text-tools-pro.com/text-reverser'
  }
}

export default function TextReverserPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Reverser Tool",
    "url": "https://www.text-tools-pro.com/text-reverser",
    "description": "Free online tool to reverse text or reverse each word's letters",
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
            { label: 'Text Tools', href: '/#tools' },
            { label: 'Text Reverser', href: '/text-reverser' }
          ]}
        />
      </div>
      <TextReverserTool />
    </>
  )
}