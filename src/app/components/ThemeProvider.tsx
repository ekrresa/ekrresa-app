'use client'

import * as React from 'react'

import { setThemeCookie } from '../lib/theme'

export type Theme = 'light' | 'dark'

interface ThemeState {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeState | undefined>(undefined)

type ThemeProviderProps = React.PropsWithChildren<{
	initialTheme: Theme
}>

export function ThemeProvider(props: ThemeProviderProps) {
	const { initialTheme, children } = props

	const [theme, setTheme] = React.useState<Theme>(initialTheme)

	React.useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)')
		const controller = new AbortController()

		mq.addEventListener(
			'change',
			(evt: MediaQueryListEvent) => {
				if (evt.matches) {
					setTheme('dark')
				} else {
					setTheme('light')
				}
			},
			{ signal: controller.signal },
		)

		return () => {
			controller.abort()
		}
	}, [])

	// Synchronize theme changes to window & cookies
	React.useEffect(() => {
		const root = window.document.documentElement
		const isDark = theme === 'dark'

		if (isDark) {
			root.setAttribute('data-theme', 'dark')
		} else {
			root.setAttribute('data-theme', 'light')
		}

		setThemeCookie(theme)
	}, [theme])

	const toggleTheme = React.useCallback(() => {
		setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
	}, [])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = React.use(ThemeContext)

	if (context === undefined) {
		throw new Error('useTheme must be used within ThemeProvider')
	}

	return context
}
