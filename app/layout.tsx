import NavBar from '@/components/client/NavBar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/server/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social',
  description: '"Social" is a social network website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-200 "}>

        <NavBar />
        <Layout>
          {children}
        </Layout>

      </body>
    </html>
  )
}

