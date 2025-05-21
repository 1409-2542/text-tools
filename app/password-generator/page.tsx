import PasswordGeneratorTool from '@/components/PasswordGeneratorTool'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Password Generator - Create Strong, Secure Passwords | TextToolsPro',
  description: 'Free online tool to generate strong, random passwords for all your online accounts. Customize length and character types.',
  keywords: 'password generator, strong password, secure password, random password',
  openGraph: {
    title: 'Password Generator - Create Strong, Secure Passwords | TextToolsPro',
    description: 'Free online tool to generate strong, random passwords for all your online accounts. Customize length and character types.',
    url: 'https://www.texttoolspro.com/password-generator',
    images: 'https://www.texttoolspro.com/images/password-generator-og.jpg',
  },
  twitter: {
    title: 'Password Generator - Create Strong, Secure Passwords | TextToolsPro',
    description: 'Free online tool to generate strong, random passwords for all your online accounts.',
    images: 'https://www.texttoolspro.com/images/password-generator-twitter.jpg',
  },
  alternates: {
    canonical: 'https://www.texttoolspro.com/password-generator'
  }
}

export default function PasswordGeneratorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Password Generator Tool",
    "url": "https://www.texttoolspro.com/password-generator",
    "description": "Free online tool to generate strong, random passwords for enhanced online security",
    "applicationCategory": "SecurityApplication",
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
            { label: 'Password Generator', href: '/password-generator' }
          ]}
        />
      </div>
      <PasswordGeneratorTool />
    </>
  )
}