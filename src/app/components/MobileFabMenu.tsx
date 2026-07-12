'use client'

import { MoonIcon, SunIcon } from './ui-icons'
import * as React from 'react'

import { useTheme } from './ThemeProvider'

export function MobileFabMenu() {
  const { theme, toggleTheme } = useTheme()
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollYRef = React.useRef(0)

  React.useEffect(() => {
    const nextScrollY = window.scrollY
    lastScrollYRef.current = nextScrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollYRef.current

      if (currentScrollY < 24) {
        setIsVisible(true)
      } else if (scrollDelta > 8) {
        setIsVisible(false)
      } else if (scrollDelta < -8) {
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const nextThemeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <div className="lg:hidden">
      <button
        aria-label={nextThemeLabel}
        className={`
          fixed inset-e-6 inset-be-[calc(env(safe-area-inset-bottom,0)+4rem)] z-40 inline-flex items-center justify-center
          rounded-full border border-ui-line bg-ui-surface-strong text-ui-ink shadow-ui-float
          backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
          block-14 inline-14
          motion-reduce:transition-none
          ${
            isVisible
              ? 'translate-y-0 scale-100 opacity-100'
              : `pointer-events-none translate-y-[calc(100%+1.75rem)] scale-90 opacity-0`
          }
        `}
        onClick={toggleTheme}
        title={nextThemeLabel}
        type="button"
      >
        <span className="sr-only">{nextThemeLabel}</span>
        {theme === 'dark' ? (
          <SunIcon className="block-5 inline-5" strokeWidth={2} />
        ) : (
          <MoonIcon className="block-5 inline-5" strokeWidth={2} />
        )}
      </button>
    </div>
  )
}
