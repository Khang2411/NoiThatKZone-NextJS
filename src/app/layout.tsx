import { Footer, Header, NextAuthProvider, ProgressBar, Slogan, Swr } from '@/components/common'
import { Box } from '@mui/material'
import { Fredoka } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nội Thất KZone',
  description: 'Nội thất được cung cấp bởi nguồn hàng đa dạng trong và ngoài nước với tiêu chi chắc chắn, bền bỉ.',
  keywords: ['NoiThatKZone', 'Nội Thất', 'Nhà cửa', 'noi that', 'nha cua', 'kzone'],
  metadataBase: new URL("https://www.noithatkzone.shop"),
}

export const maxDuration = 60;

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={fredoka.className}>
        <ProgressBar></ProgressBar>
        <NextAuthProvider>
          <Swr>
            <Box component={'header'}>
              <Header></Header>
            </Box>
            <Box component={'main'}>
              {children}
            </Box>
            <Slogan></Slogan>
            <Box component={'footer'}>
              <Footer></Footer>
            </Box>
          </Swr>
        </NextAuthProvider>
      </body>
    </html>
  )
}
