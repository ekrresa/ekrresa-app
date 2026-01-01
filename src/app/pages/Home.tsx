import { siteMetadata } from '../lib/misc'

export function Home() {
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
		</div>
	)
}
