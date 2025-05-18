import TextToSlugConverter from '@/components/TextToSlugConverter'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text to Slug Converter - Create SEO-Friendly URLs | TextToolsPro',
  description: 'Free online tool to convert text into clean, SEO-friendly URL slugs for websites and blogs.',
  keywords: 'slug generator, URL slug, text to slug, SEO friendly URL, URL converter',
  openGraph: {
    title: 'Text to Slug Converter - Create SEO-Friendly URLs | TextToolsPro',
    description: 'Free online tool to convert text into clean, SEO-friendly URL slugs for websites and blogs.',
    url: 'https://www.texttoolspro.com/text-to-slug',
    images: 'https://www.texttoolspro.com/images/text-to-slug-og.jpg',
  },
  twitter: {
    title: 'Text to Slug Converter - Create SEO-Friendly URLs | TextToolsPro',
    description: 'Free online tool to convert text into clean, SEO-friendly URL slugs for websites and blogs.',
    images: 'https://www.texttoolspro.com/images/text-to-slug-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/text-to-slug'
  }
}

export default function TextToSlugPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Text to Slug Converter",
    "url": "https://www.texttoolspro.com/text-to-slug",
    "description": "Free online tool to convert text into SEO-friendly URL slugs",
    "applicationCategory": "WebDevelopmentApplication",
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
            { label: 'Text to Slug', href: '/text-to-slug' }
          ]}
        />
      </div>
      <TextToSlugConverter />
    </>
  )
}