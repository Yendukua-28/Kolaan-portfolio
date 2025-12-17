import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Kolaan Moses Yendukua - Professional Portfolio',
    template: '%s | Kolaan Moses Yendukua',
  },
  description: 'Professional portfolio of Kolaan Moses Yendukua. Explore my background, expertise, and projects.',
  keywords: ['Kolaan Moses Yendukua', 'portfolio', 'professional'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kolaan-portfolio.vercel.app',
    siteName: 'Kolaan Moses Yendukua',
    title: 'Kolaan Moses Yendukua - Professional Portfolio',
    description: 'Professional portfolio of Kolaan Moses Yendukua',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kolaan Moses Yendukua Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolaan Moses Yendukua - Professional Portfolio',
    description: 'Professional portfolio of Kolaan Moses Yendukua',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
