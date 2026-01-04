import { allPosts } from 'content-collections'

import { IMAGE_BASE_URL } from '../lib/misc'

export function Blog() {
	const posts = allPosts
		.filter(post => post.published)
		.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	console.log(posts, allPosts)

	return (
		<div className="py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						Blog
					</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600 dark:text-port-300">
						Thoughts, tutorials, and insights on web development.
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{posts.map(post => (
						<article
							key={post.slug}
							className="flex flex-col items-start justify-between"
						>
							{post.imageId && (
								<div className="relative w-full">
									<img
										src={`${IMAGE_BASE_URL}${post.imageId}`}
										alt={post.imageAlt || post.title}
										className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] dark:bg-port-900/50"
									/>
									<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
								</div>
							)}
							<div className="max-w-xl">
								<div className="mt-8 flex items-center gap-x-4 text-xs">
									<time
										dateTime={post.date}
										className="text-gray-500 dark:text-port-400"
									>
										{new Date(post.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</time>
								</div>
								<div className="group relative">
									<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 transition-colors group-hover:text-rose-500 dark:text-white dark:group-hover:text-cyan-400">
										<a href={`/blog/${post.slug}`}>
											<span className="absolute inset-0" />
											{post.title}
										</a>
									</h3>
									<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-port-300">
										{post.summary}
									</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	)
}
