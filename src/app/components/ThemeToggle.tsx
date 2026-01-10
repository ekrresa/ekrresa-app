'use client'

export function ThemeToggle() {
	return (
		<button
			aria-label="Toggle dark mode"
			className="flex h-10 w-11 items-center justify-center rounded-full text-rose-500 shadow-md shadow-rose-100 ring-1 ring-gray-900/5 backdrop-blur-lg transition-colors hover:text-rose-400 dark:text-port-100 dark:shadow-lg dark:shadow-brand-900 dark:ring-[#364e69] hover:dark:text-port-300"
			type="button"
		>
			<img className="size-6" alt="Theme Toggle" src="/icons/moon.svg" />
		</button>
	)
}
