import { allAbouts } from 'content-collections'

import { siteMetadata } from '../lib/misc'

export function About() {
	const about = allAbouts[0]
	const { title, skills, experiences, content } = about

	return (
		<section className="mx-auto max-w-3xl py-16 sm:py-24">
			<header className="mb-16">
				<h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-port-50 sm:text-5xl">
					{title}
				</h1>
				<div
					className="prose prose-lg dark:prose-invert text-gray-600 dark:text-port-200"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</header>

			<div className="space-y-20">
				<section>
					<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-port-50">
						Work Experience
					</h2>
					<div className="space-y-10">
						{experiences.map(exp => (
							<div key={exp.company} className="group relative flex flex-col">
								<div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
									<h3 className="text-lg font-semibold text-gray-800 dark:text-port-100">
										{exp.role}
									</h3>
									<span className="text-sm font-medium text-gray-500 dark:text-port-400">
										{exp.period}
									</span>
								</div>
								<div className="mt-1 font-medium text-rose-500 dark:text-cyan-400">
									{exp.company}
								</div>
								<p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-port-300">
									{exp.description}
								</p>
							</div>
						))}
					</div>
				</section>

				<section>
					<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-port-50">
						Skills & Technologies
					</h2>
					<div className="flex flex-wrap gap-3">
						{skills.map(skill => (
							<span
								key={skill}
								className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-900/5 transition-colors hover:bg-gray-200 dark:bg-port-900/50 dark:text-port-200 dark:ring-white/10 dark:hover:bg-port-800"
							>
								{skill}
							</span>
						))}
					</div>
				</section>

				<section className="rounded-3xl bg-gray-50 p-8 dark:bg-port-900/30">
					<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-port-50">
						Let&#39;s Connect
					</h2>
					<p className="mb-6 text-gray-600 dark:text-port-300">
						I&#39;m always open to discussing new projects, creative ideas, or
						opportunities to be part of your vision.
					</p>
					<div className="flex gap-6">
						<a
							href={siteMetadata.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors hover:text-rose-500 dark:text-port-50 dark:hover:text-cyan-400"
						>
							Twitter
						</a>
						<a
							href={siteMetadata.github}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors hover:text-rose-500 dark:text-port-50 dark:hover:text-cyan-400"
						>
							GitHub
						</a>
						<a
							href={siteMetadata.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors hover:text-rose-500 dark:text-port-50 dark:hover:text-cyan-400"
						>
							LinkedIn
						</a>
					</div>
				</section>
			</div>
		</section>
	)
}
