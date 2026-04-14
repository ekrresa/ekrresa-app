'use client'

import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextThemeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      aria-label={nextThemeLabel}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-muted shadow-[0_10px_28px_rgba(24,21,17,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:text-ink dark:border-white/10 dark:bg-white/7 dark:text-muted dark:shadow-[0_16px_32px_rgba(0,0,0,0.3)] dark:hover:border-white/20 dark:hover:bg-white/12 dark:hover:text-ink"
      onClick={toggleTheme}
      title={nextThemeLabel}
      type="button"
    >
      {theme === 'dark' ? (
        <SunIcon strokeWidth={2} className="size-5" />
      ) : (
        <MoonIcon strokeWidth={2} className="size-5" />
      )}
    </button>
  )
}
