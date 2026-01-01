import { allProjects } from 'content-collections'

import { siteMetadata } from '../lib/misc'

export function Home() {
	const projects = allProjects.toSorted((a, b) => a.order - b.order)

	return (
		<div className="space-y-32 pb-24">
			<section className="mx-auto mt-24 md:mt-40">
				<div className="max-w-4xl">
					<h1 className="mb-6 text-6xl font-black uppercase leading-tight text-gray-900 dark:text-white sm:text-7xl md:text-8xl">
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
		</div>
	)
}
