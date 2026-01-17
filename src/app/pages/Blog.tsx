import { allPosts } from 'content-collections'

import { IMAGE_BASE_URL } from '../lib/utils'

export function Blog() {
	const sortedPosts = allPosts
		.filter(post => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const featuredPost = sortedPosts[0]
	const gridPosts = sortedPosts.slice(1)

	return (
		<div className="pt-24 sm:pt-32 pb-16">
			<header className="flex items-center flex-col">
				<h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl text-balance">
					Writing & Thoughts
				</h2>
				<p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400 ">
					Insights on software engineering, web development, and design
					patterns.
				</p>
			</header>

			<div className="mt-16 space-y-20">
				{/* Featured Post */}
				{featuredPost && (
					<article className="relative isolate flex flex-col gap-8 lg:flex-row lg:gap-12 bg-white/5 px-10 lg:items-center">
						{featuredPost.imageId && (
							<div className="relative aspect-video w-full lg:w-1/2 shrink-0 overflow-hidden rounded-2xl">
								<img
									src={`${IMAGE_BASE_URL}${featuredPost.imageId}`}
									alt={featuredPost.imageAlt || featuredPost.title}
									className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-105"
								/>
								<div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 rounded-2xl" />
							</div>
						)}
						<div className="flex flex-col justify-center lg:py-6">
							<div className="flex items-center gap-x-4 text-xs">
								<time
									dateTime={featuredPost.date}
									className="text-gray-500 dark:text-gray-400"
								>
									{new Date(featuredPost.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</time>
								<div className="flex gap-2">
									{featuredPost.tags.slice(0, 2).map(tag => (
										<span
											key={tag}
											className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
							<div className="group relative">
								<h3 className="mt-4 text-3xl font-bold leading-8 text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
									<a href={`/blog/${featuredPost.slug}`}>
										<span className="absolute inset-0" />
										{featuredPost.title}
									</a>
								</h3>
								<p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
									{featuredPost.summary}
								</p>
							</div>
						</div>
					</article>
				)}

				{/* Grid of Other Posts */}
				<div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{gridPosts.map(post => (
						<article
							key={post.slug}
							className="flex flex-col justify-start group"
						>
							{post.imageId && (
								<div className="relative w-full overflow-hidden rounded-2xl mb-6">
									<img
										src={`${IMAGE_BASE_URL}${post.imageId}`}
										alt={post.imageAlt || post.title}
										className="aspect-video w-full bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 dark:bg-gray-800 transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
								</div>
							)}
							<div>
								<time
									dateTime={post.date}
									className="text-gray-500 dark:text-gray-400 text-xs"
								>
									{new Date(post.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</time>

								<div className="relative">
									<h3 className="mt-3 text-xl font-bold leading-6 text-gray-900 group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400 transition-colors">
										<a href={`/blog/${post.slug}`}>
											<span className="absolute inset-0" />
											{post.title}
										</a>
									</h3>
									<p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
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
