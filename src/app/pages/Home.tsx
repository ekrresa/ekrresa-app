import { allAbouts, allPosts, allProjects } from 'content-collections'

import { IMAGE_BASE_URL, siteMetadata } from '../lib/misc'

export function Home() {
	const projects = allProjects.toSorted((a, b) => a.order - b.order)

	const about = allAbouts[0]

	const latestPost = allPosts
		.filter(post => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

	const latestExperience = about.experiences[0]

	return (
		<div className="space-y-32 pb-24">
			<section className="relative mx-auto mt-24 md:mt-40">
				{/* Background elements */}
				<div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
				<div className="absolute -left-20 -top-20 z-0 size-72 rounded-full bg-rose-500/30 blur-[100px] dark:bg-rose-500/20" />
				<div className="absolute right-0 top-20 z-0 size-72 rounded-full bg-cyan-400/30 blur-[100px] dark:bg-cyan-400/20" />

				<div className="relative z-10 max-w-4xl">
					<h1 className="mb-6 text-6xl font-black tracking-tighter uppercase leading-tight text-gray-900 dark:text-white sm:text-7xl md:text-8xl">
						ochuko{' '}
						<span className="text-rose-500 dark:text-cyan-400">ekrresa</span>
					</h1>
					<p className="text-lg leading-relaxed text-gray-600 dark:text-port-200 sm:text-xl">
						Hi, my name is Ochuko and this is my digital garden. I&#39;m a
						software engineer building products for the web. Over the years, I
						have learned a lot while working on interesting projects, and I want
						to share that knowledge with you.
					</p>

					<div className="mt-10 flex flex-wrap gap-6 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">
						<a
							className="group relative transition-colors hover:text-rose-500 dark:hover:text-cyan-400"
							href={siteMetadata.github}
							rel="noopener noreferrer"
							target="_blank"
						>
							GitHub
							<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-rose-500 transition-all group-hover:w-full dark:bg-cyan-400" />
						</a>
						<a
							className="group relative transition-colors hover:text-rose-500 dark:hover:text-cyan-400"
							href={siteMetadata.linkedin}
							rel="noopener noreferrer"
							target="_blank"
						>
							LinkedIn
							<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-rose-500 transition-all group-hover:w-full dark:bg-cyan-400" />
						</a>
						<a
							className="group relative transition-colors hover:text-rose-500 dark:hover:text-cyan-400"
							href={siteMetadata.twitter}
							rel="noopener noreferrer"
							target="_blank"
						>
							Twitter
							<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-rose-500 transition-all group-hover:w-full dark:bg-cyan-400" />
						</a>
					</div>
				</div>
			</section>

			{/* Latest Article Section */}
			{latestPost && (
				<section>
					<div className="mb-12 flex items-end justify-between">
						<div>
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
								Latest Article
							</h2>
							<p className="mt-4 text-gray-600 dark:text-port-300">
								Fresh from the press.
							</p>
						</div>
						<a
							href="/blog"
							className="group hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose-500 transition-colors hover:text-rose-600 dark:text-cyan-400 dark:hover:text-cyan-300 sm:flex"
						>
							Read All Articles
							<span className="transition-transform group-hover:translate-x-1">
								→
							</span>
						</a>
					</div>

					<a
						href={`/blog/${latestPost.slug}`}
						className="group relative flex flex-col gap-8 rounded-3xl bg-gray-50 p-8 ring-1 ring-gray-900/5 transition hover:bg-gray-100 lg:flex-row lg:items-center dark:bg-port-900/30 dark:ring-white/10 dark:hover:bg-port-900/50"
					>
						{latestPost.imageId && (
							<div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl lg:w-1/2">
								<img
									src={`${IMAGE_BASE_URL}${latestPost.imageId}`}
									alt={latestPost.imageAlt || latestPost.title}
									className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
								/>
							</div>
						)}

						<div className="flex flex-col justify-center">
							<div className="flex items-center gap-x-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-port-500">
								<time dateTime={latestPost.date}>
									{new Date(latestPost.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</time>
							</div>
							<h3 className="mt-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-rose-500 dark:text-white dark:group-hover:text-cyan-400 sm:text-3xl">
								{latestPost.title}
							</h3>
							<p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-port-300">
								{latestPost.summary}
							</p>
							<div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose-500 dark:text-cyan-400">
								Read Article
								<span className="transition-transform group-hover:translate-x-1">
									→
								</span>
							</div>
						</div>
					</a>
				</section>
			)}

			{/* Featured Projects Section */}
			<section>
				<div className="mb-12 flex items-end justify-between">
					<div>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
							Featured Projects
						</h2>
						<p className="mt-4 text-gray-600 dark:text-port-300">
							A selection of my favorite works.
						</p>
					</div>
					<a
						href="/projects"
						className="group hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose-500 transition-colors hover:text-rose-600 dark:text-cyan-400 dark:hover:text-cyan-300 sm:flex"
					>
						View All Projects
						<span className="transition-transform group-hover:translate-x-1">
							→
						</span>
					</a>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{projects.map(project => (
						<a
							key={project.title}
							href={project.link}
							target="_blank"
							className="group flex flex-col"
						>
							<div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-900/5 dark:bg-port-900/50 dark:ring-white/10">
								<img
									src={project.image}
									className="object-cover size-full transition duration-500 group-hover:scale-105"
									alt={project.title}
								/>
							</div>
							<div className="mt-6">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-rose-500 dark:group-hover:text-cyan-400">
									{project.title}
								</h3>
								<p className="mt-2 line-clamp-2 text-base text-gray-600 dark:text-port-300">
									{project.summary}
								</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{project.stack.slice(0, 3).map(tech => (
										<span
											key={tech}
											className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-port-500"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</a>
					))}
				</div>

				<div className="mt-12 sm:hidden">
					<a
						href="/projects"
						className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-4 text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors hover:bg-gray-200 dark:bg-port-900/50 dark:text-white dark:hover:bg-port-800"
					>
						View All Projects
						<span>→</span>
					</a>
				</div>
			</section>

			{/* Experience Summary */}
			<section className="grid grid-cols-1 gap-12 lg:grid-cols-2">
				<div className="flex flex-col justify-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
						Currently Building
					</h2>
					<p className="mt-4 text-gray-600 dark:text-port-300">
						I am currently working as a{' '}
						<span className="font-semibold text-gray-900 dark:text-white">
							{latestExperience.role}
						</span>{' '}
						at{' '}
						<span className="font-semibold text-rose-500 dark:text-cyan-400">
							{latestExperience.company}
						</span>
						. I focus on creating high-quality web applications that are both
						performant and accessible.
					</p>
					<div className="mt-8">
						<a
							href="/about"
							className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose-500 transition-colors hover:text-rose-600 dark:text-cyan-400 dark:hover:text-cyan-300"
						>
							Read My Story
							<span className="transition-transform group-hover:translate-x-1">
								→
							</span>
						</a>
					</div>
				</div>

				<div className="rounded-3xl bg-gray-50 p-8 ring-1 ring-gray-900/5 dark:bg-port-900/30 dark:ring-white/10">
					<h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-port-500">
						Skills & Stack
					</h3>
					<div className="flex flex-wrap gap-3">
						{about.skills.slice(0, 10).map(skill => (
							<span
								key={skill}
								className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-gray-900/5 dark:bg-port-800 dark:text-port-200 dark:ring-white/10"
							>
								{skill}
							</span>
						))}
						<span className="text-xs font-semibold text-gray-400 dark:text-port-500">
							+ more
						</span>
					</div>
				</div>
			</section>
		</div>
	)
}
