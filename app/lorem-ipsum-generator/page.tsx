import LoremIpsumGenerator from '@/components/LoremIpsumGenerator'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Create Placeholder Text Online | TextToolsPro',
  description: 'Free online tool to generate Lorem Ipsum placeholder text for your designs and mockups. Customize length and format.',
  keywords: 'lorem ipsum, placeholder text, dummy text, text generator, design mockups',
  openGraph: {
    title: 'Lorem Ipsum Generator - Create Placeholder Text Online | TextToolsPro',
    description: 'Free online tool to generate Lorem Ipsum placeholder text for your designs and mockups.',
    url: 'https://www.text-tools-pro.com/lorem-ipsum-generator',
    images: 'https://www.text-tools-pro.com/images/lorem-ipsum-og.jpg',
  },
  twitter: {
    title: 'Lorem Ipsum Generator - Create Placeholder Text Online | TextToolsPro',
    description: 'Free online tool to generate Lorem Ipsum placeholder text for your designs and mockups.',
    images: 'https://www.text-tools-pro.com/images/lorem-ipsum-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.text-tools-pro.com/lorem-ipsum-generator'
  }
}

export default function LoremIpsumGeneratorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lorem Ipsum Generator",
    "url": "https://www.text-tools-pro.com/lorem-ipsum-generator",
    "description": "Free online tool to generate Lorem Ipsum placeholder text for design mockups",
    "applicationCategory": "DesignApplication",
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
            { label: 'Lorem Ipsum Generator', href: '/lorem-ipsum-generator' }
          ]}
        />
      </div>
      <LoremIpsumGenerator />
    </>
  )
}