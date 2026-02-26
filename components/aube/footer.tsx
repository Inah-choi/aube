import { Camera } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo & Description */}
          <span className="font-serif text-xl font-bold text-foreground">
            aube
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            AI 기술로 만드는
            <br />
            프리미엄 웨딩 스냅 스튜디오
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/aube_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Instagram"
            >
              <Camera className="h-5 w-5" />
            </a>
            <a
              href="http://pf.kakao.com/_IxaZqX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="KakaoTalk"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.54-.96 3.47-.99 3.7 0 0-.02.17.09.23.11.07.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.55.08 1.13.12 1.72.12 5.52 0 10-3.58 10-7.94C22 6.58 17.52 3 12 3z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} aube. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
