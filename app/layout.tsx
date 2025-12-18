import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Clone Assistant - Dijital İkiziniz',
  description: 'Yapay zeka destekli kişisel asistanınız',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
