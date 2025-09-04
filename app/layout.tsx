import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'RSS Reader',
  description: 'Simple RSS reader'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
