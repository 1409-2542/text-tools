import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script';


export const metadata: Metadata = {
  title: 'TextToolsPro - Free Online Text Processing Tools',
  description: 'Free online text tools for all your text processing needs. Convert case, count words, remove duplicates, generate Lorem Ipsum, and more with our powerful text utilities.',
  keywords: 'text tools, word counter, character counter, case converter, text generator, text formatter, online text tools, text utilities',
  authors: [{ name: 'TextToolsPro' }],
  robots: 'index, follow',
  openGraph: {
    title: 'TextToolsPro - Free Online Text Processing Tools',
    description: 'Comprehensive collection of free online text tools for all your text processing needs.',
    type: 'website',
    url: 'https://www.texttoolspro.com',
    images: 'https://www.texttoolspro.com/images/og-image.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextToolsPro - Free Online Text Processing Tools',
    description: 'Comprehensive collection of free online text tools for all your text processing needs.',
    images: 'https://www.texttoolspro.com/images/twitter-card.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TextToolsPro",
    "url": "https://www.texttoolspro.com",
    "description": "Free online text processing tools for all your needs",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-G7DWPGCD7N"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G7DWPGCD7N');
            `,
          }}
        />        
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}