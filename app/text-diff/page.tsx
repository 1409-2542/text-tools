import TextDiffTool from '@/components/TextDiffTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Diff Tool - Compare & Find Differences Online | TextToolsPro',
  description: 'Free online tool to compare two texts and highlight differences. Perfect for code review, document version control, and content analysis.',
  keywords: 'text diff, compare text, difference checker, text comparison, online diff tool',
  openGraph: {
    title: 'Text Diff Tool - Compare & Find Differences Online | TextToolsPro',
    description: 'Free online tool to compare two texts and highlight differences. Perfect for code review, document version control, and content analysis.',
    url: 'https://www.texttoolspro.com/text-diff',
    images: 'https://www.texttoolspro.com/images/text-diff-og.jpg',
  },
  twitter: {
    title: 'Text Diff Tool - Compare & Find Differences Online | TextToolsPro',
    description: 'Free online tool to compare two texts and highlight differences.',
    images: 'https://www.texttoolspro.com/images/text-diff-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/text-diff'
  }
}

export default function TextDiffPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text Diff Tool",
    "url": "https://www.texttoolspro.com/text-diff",
    "description": "Free online tool to compare two texts and highlight differences between them",
    "applicationCategory": "DeveloperApplication",
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
            { label: 'Text Diff', href: '/text-diff' }
          ]}
        />
      </div>
      <TextDiffTool />
    </>
  )
}