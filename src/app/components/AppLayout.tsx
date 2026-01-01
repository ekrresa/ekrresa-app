import type { LayoutProps } from 'rwsdk/router'

import { appNavLinks, cn, siteMetadata } from '../lib/misc'
import { ThemeToggle } from './ThemeToggle'

export function AppLayout({ children, requestInfo }: LayoutProps) {
	const path = requestInfo?.path ?? '/'

	return (
		<div>
			<title>My App</title>
			<div className="fixed inset-0 flex justify-center">
				<div className="w-full max-w-7xl bg-gray-50 ring-1 ring-gray-100 transition-colors"></div>
			</div>

			<div className="safe-area relative flex flex-col">
				<header className="shrink-0">
					<div className="mx-auto flex max-w-280 items-center justify-between p-5 backdrop:blur-lg">
						<a className="rounded-full shadow-lg shadow-rose-100" href="/">
							<img alt="Logo" className="size-10" src="/icons/logo-light.svg" />
						</a>

						<nav className="hidden rounded-full px-8 py-2 shadow-md shadow-rose-100 ring-1 ring-gray-900/5 backdrop-blur-lg dark:bg-charcoal dark:shadow-brand-900 dark:ring-[#364e69] sm:block">
							<ul className="flex items-center justify-between gap-4">
								{appNavLinks.map(item => {
									const isActive = path.startsWith(item.url)

									return (
										<li
											className={cn(
												'font-medium uppercase text-gray-500 transition-colors hover:text-rose-500 dark:text-linen-50 dark:hover:text-cyan-300',
												isActive && 'text-rose-500 dark:text-cyan-300',
											)}
											key={item.text}
										>
											<a href={item.url}>{item.text}</a>
										</li>
									)
								})}
							</ul>
						</nav>

						<ThemeToggle />
					</div>
				</header>

				<main className="mx-auto w-full max-w-280 flex-1 px-5">{children}</main>

				<footer className="shrink-0 mx-auto mt-48 w-full max-w-7xl border-t border-gray-200 dark:border-stone-800">
					<div className="mx-auto flex max-w-280 flex-col items-center justify-between gap-2 px-5 py-4 text-sm sm:flex-row">
						<p className="uppercase">
							All rights reserved &#169; {new Date().getFullYear()}
						</p>
						<p className="hidden uppercase sm:block">
							<a
								href={siteMetadata.github}
								rel="noreferrer noopener"
								target="_blank"
							>
								Ochuko Ekrresa
							</a>
						</p>
					</div>
				</footer>
			</div>
		</div>
	)
}
