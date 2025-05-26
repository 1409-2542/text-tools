import RemoveExtraSpacesTool from '@/components/RemoveExtraSpacesTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Remove Extra Spaces - Clean & Format Your Text Online | TextToolsPro',
  description: 'Free online tool to clean text by removing extra spaces and formatting whitespace',
  keywords: 'remove extra spaces, clean text, trim spaces, delete double spaces, text formatter',
  openGraph: {
    title: 'Remove Extra Spaces - Clean Your Text Online | TextToolsPro',
    description: 'Free online tool to remove extra spaces, trim whitespace, and clean up your text formatting instantly.',
    url: 'https://www.texttoolspro.com/remove-extra-spaces',
    images: 'https://www.texttoolspro.com/images/remove-spaces-og.jpg',
  },
  twitter: {
    title: 'Remove Extra Spaces - Clean Your Text Online | TextToolsPro',
    description: 'Free online tool to remove extra spaces, trim whitespace, and clean up your text formatting instantly.',
    images: 'https://www.texttoolspro.com/images/remove-spaces-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/remove-extra-spaces'
  }
}

export default function RemoveExtraSpacesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Remove Extra Spaces Tool",
    "url": "https://www.texttoolspro.com/remove-extra-spaces",
    "description": "Free online tool to clean text by removing extra spaces and formatting whitespace",
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
            { label: 'Remove Extra Spaces', href: '/remove-extra-spaces' }
          ]}
        />
      </div>
      <RemoveExtraSpacesTool />
    </>
  )
}