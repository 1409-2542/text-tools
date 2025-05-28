import type { Metadata } from 'next'
import './tutorials.css'


export const metadata: Metadata = {
  title: 'TextToolsPro - Free Online Text Processing Tools',
  description: 'Free online text tools for all your text processing needs',
  keywords: 'text tools, word counter, character counter, case converter',
  authors: [{ name: 'TextToolsPro' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://www.texttoolspro.com',
  },
  twitter: {
    card: 'summary_large_image',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}