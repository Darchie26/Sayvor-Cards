import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sayvor — AI Greeting Cards',
  description: 'Make someone you love smile in 30 seconds',
  openGraph: {
    title: 'Sayvor — AI Greeting Cards',
    description: 'Make someone you love smile in 30 seconds',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}