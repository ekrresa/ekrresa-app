'use client'

import { SunDimIcon, MoonIcon } from '@phosphor-icons/react'

import { useTheme } from '../ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextThemeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      aria-label={nextThemeLabel}
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-ui-line bg-ui-canvas text-ui-muted shadow-ui-control backdrop-blur-sm transition block-9 inline-9 hover:-translate-y-0.5 hover:border-ui-accent/35 hover:bg-ui-accent/14 hover:text-ui-ink"
      onClick={toggleTheme}
      title={nextThemeLabel}
      type="button"
    >
      {theme === 'dark' ? (
        <SunDimIcon className="block-5 inline-5" />
      ) : (
        <MoonIcon className="block-5 inline-5" />
      )}
    </button>
  )
}
