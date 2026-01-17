import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const appNavLinks = [
	{ text: 'home', url: '/' },
	{ text: 'blog', url: '/blog' },
	{ text: 'projects', url: '/projects' },
	{ text: 'about', url: '/about' },
] as const

export const siteMetadata = {
	title: 'Ochuko Ekrresa – Software Engineer',
	author: 'Ochuko Ekrresa',
	description:
		'Ochuko is a software engineer building products for the web. Sharing insights on web development, best practices, and lessons learned.',
	language: 'en',
	siteUrl: 'https://www.ekrresa.com',
	siteRepo: 'https://github.com/ekrresa/ekrresa.com',
	socialBanner:
		'https://res.cloudinary.com/chuck-huey/image/upload/w_1200,h_630,c_fill,f_auto/v1696674962/personal/Main_Social_Card_vmnrxs.png',
	email: 'mailto:ekrresaochuko@gmail.com',
	github: 'https://github.com/ekrresa',
	twitter: 'https://twitter.com/ekrresa_',
	twitterHandle: '@ekrresa_',
	linkedin: 'https://www.linkedin.com/in/ekrresa/',
	locale: 'en-GB',
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const IMAGE_BASE_URL = 'https://assets.ekrresa.com'

export function copyToClipboard(text: string) {
	if (navigator.clipboard) {
		return navigator.clipboard.writeText(text)
	} else {
		return fallbackCopyTextToClipboard(text)
	}
}

function fallbackCopyTextToClipboard(text: string) {
	const textArea = document.createElement('textarea', {})
	textArea.style.display = 'none'
	textArea.value = text

	document.body.appendChild(textArea)
	textArea.focus()
	textArea.select()

	try {
		const successful = document.execCommand('copy')
		const msg = successful ? 'successful' : 'unsuccessful'

		return msg === 'successful' ? Promise.resolve() : Promise.reject()
	} catch (err) {
		return Promise.reject(err)
	} finally {
		document.body.removeChild(textArea)
	}
}
