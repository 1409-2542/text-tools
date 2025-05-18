import CaseConverterTool from '@/components/CaseConverterTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Converter Tool - Change Text Case Online | TextToolsPro',
  description: 'Free online tool to convert text between uppercase, lowercase, title case, sentence case and more. No registration required.',
  keywords: 'case converter, uppercase, lowercase, title case, sentence case, text formatter',
  openGraph: {
    title: 'Case Converter Tool - Change Text Case Online | TextToolsPro',
    description: 'Free online tool to convert text between uppercase, lowercase, title case, sentence case and more.',
    url: 'https://www.text-tools-pro.com/case-converter',
    images: 'https://www.text-tools-pro.com/images/case-converter-og.jpg',
  },
  twitter: {
    title: 'Case Converter Tool - Change Text Case Online | TextToolsPro',
    description: 'Free online tool to convert text between uppercase, lowercase, title case, sentence case and more.',
    images: 'https://www.text-tools-pro.com/images/case-converter-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.text-tools-pro.com/case-converter'
  }
}

export default function CaseConverterPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Case Converter Tool",
    "url": "https://www.text-tools-pro.com/case-converter",
    "description": "Free online tool to convert text between different cases (uppercase, lowercase, title case, etc.)",
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
            { label: 'Case Converter', href: '/case-converter' }
          ]}
        />
      </div>
      <CaseConverterTool />
    </>
  )
}