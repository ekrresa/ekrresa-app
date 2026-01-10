import { allPosts } from 'content-collections'
import { lazy, Suspense, useMemo } from 'react'

import { IMAGE_BASE_URL } from '../lib/misc'

const posts = import.meta.glob('../../content/posts/**/*.mdx')

export function BlogPost({ params }: { params: { slug: string } }) {
	const post = allPosts.find(p => p.slug === params.slug)

	const Component = useMemo(() => {
		if (!post) return null
		// We need to reconstruct the path key that import.meta.glob expects.
		// Since content-collections might give us a slug that matches the directory name,
		// and the glob is for **/*.mdx, we need to find the matching entry.

		// The glob pattern `../../content/posts/**/*.mdx` resolves to keys like:
		// `../../content/posts/my-post/index.mdx`

		const filePath = `../../content/posts/${post.slug}/index.mdx`
		const importFn = posts[filePath] as
			| (() => Promise<{ default: React.ComponentType }>)
			| undefined

		return importFn ? lazy(importFn) : null
	}, [post])

	if (!post || !Component) {
		return (
			<div className="flex flex-col items-center justify-center py-24 sm:py-32">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
					Post not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
					Sorry, we couldn’t find the post you’re looking for.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/blog"
						className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
					>
						Back to blog
					</a>
				</div>
			</div>
		)
	}

	return (
		<article className="mx-auto max-w-3xl pt-24 pb-16 sm:pt-32">
			{/* Back Link */}
			<div className="mb-8">
				<a
					href="/blog"
					className="text-sm font-semibold leading-6 text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
				>
					&larr; Back to blog
				</a>
			</div>

			{/* Header */}
			<header className="flex flex-col text-center">
				<div className="flex items-center justify-center gap-x-4 text-xs">
					<time
						dateTime={post.date}
						className="text-gray-500 dark:text-gray-400"
					>
						{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</time>
					<div className="flex gap-2">
						{post.tags.map(tag => (
							<span
								key={tag}
								className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
				<h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl text-balance">
					{post.title}
				</h1>
				<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
					{post.summary}
				</p>
			</header>

			{/* Featured Image */}
			{post.imageId && (
				<div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
					<img
						src={`${IMAGE_BASE_URL}${post.imageId}`}
						alt={post.imageAlt || post.title}
						className="h-full w-full object-cover"
					/>
				</div>
			)}

			{/* Content */}
			<div className="mt-10 prose prose-lg prose-rose dark:prose-invert max-w-none">
				<Suspense fallback={<div>Loading...</div>}>
					<Component />
				</Suspense>
			</div>
		</article>
	)
}
