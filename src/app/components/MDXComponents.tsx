import type { ComponentPropsWithoutRef } from 'react'

function CustomLink({
	href,
	children,
	...props
}: ComponentPropsWithoutRef<'a'>) {
	const isInternalLink = href?.startsWith('/') || href?.startsWith('#')

	if (isInternalLink) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		)
	}

	return (
		<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
			{children}
		</a>
	)
}

function CustomImage({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) {
	return (
		<span className="block my-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
			<img src={src} alt={alt} className="w-full h-auto" {...props} />
			{alt && (
				<span className="block py-2 px-4 text-sm text-center text-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
					{alt}
				</span>
			)}
		</span>
	)
}

export const components = {
	a: CustomLink,
	img: CustomImage,
}
