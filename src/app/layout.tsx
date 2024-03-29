import { Footer, Header, NextAuthProvider, ProgressBar, Slogan, Swr } from '@/components/common'
import { Box } from '@mui/material'
import { Fredoka } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const fredoka = Fredoka({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Nội Thất KZone',
  keywords: ['NoiThatKZone', 'Nội Thất', 'Nhà cửa'],
  metadataBase: new URL("https://www.noithatkzone.online/"),
}

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
