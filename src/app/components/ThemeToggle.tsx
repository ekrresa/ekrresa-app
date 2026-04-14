'use client'

import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      aria-label="Toggle dark mode"
      className="flex h-10 w-11 items-center justify-center rounded-full text-primary shadow-md shadow-primary-200 ring-1 ring-gray-900/5 backdrop-blur-lg transition-colors hover:text-primary-400 dark:text-port-100 dark:shadow-lg dark:shadow-brand-900 dark:ring-[#364e69] hover:dark:text-port-300"
      onClick={toggleTheme}
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
