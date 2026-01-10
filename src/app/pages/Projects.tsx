import { allProjects } from 'content-collections'

export function Projects() {
	const projects = allProjects.toSorted((a, b) => a.order - b.order)

	return (
		<section className="pt-24 sm:pt-32 pb-16">
			<header>
				<h1 className="heading text-center text-4xl sm:text-5xl tracking-tight font-bold capitalize">
					Projects
				</h1>
				<p className="mt-4 text-center text-gray-600 dark:text-gray-400 sm:text-lg">
					A collection of projects I&#39;ve built, from experiments to
					production applications.
				</p>
			</header>

			<section className="mt-24">
				<ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{projects.map(project => (
						<li key={project.title} className="group relative flex flex-col">
							<div className="relative z-10 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-900/5 dark:bg-port-900/50 dark:ring-white/10">
								<img
									src={project.image}
									className="object-cover size-full transition duration-500 group-hover:scale-105"
									alt={project.title}
								/>
							</div>

							<div className="mt-6 flex flex-1 flex-col">
								<h2 className="text-xl font-bold text-gray-800 dark:text-port-100">
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										<span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
										<span className="relative z-10">{project.title}</span>
									</a>
								</h2>
								<p className="relative z-10 mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-port-300">
									{project.summary}
								</p>
								<div className="mt-auto pt-6">
									<ul className="relative z-10 flex flex-wrap gap-2">
										{project.stack.map(item => (
											<li
												key={item}
												className="rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-600 dark:bg-port-800 dark:text-port-200"
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						</li>
					))}
				</ul>
			</section>
		</section>
	)
}
