import type { Metadata, Viewport } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "aube | AI 웨딩 스냅 스튜디오",
  description:
    "셀카 한 장이 웨딩 스냅이 됩니다. AI 기술로 만드는 프리미엄 웨딩 스냅 보정 서비스.",
  metadataBase: new URL("https://aube.ai.kr"),
  openGraph: {
    title: "aube | AI 웨딩 스냅 스튜디오",
    description:
      "셀카 한 장이 웨딩 스냅이 됩니다. AI 기술로 만드는 프리미엄 웨딩 스냅 보정 서비스.",
    url: "https://aube.ai.kr",
    siteName: "aube",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://aube.ai.kr",
  },
}

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
