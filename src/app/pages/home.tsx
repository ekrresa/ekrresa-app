import { ArticleCard } from '@/app/components/ArticleCard'
import { allPosts, allProjects } from 'content-collections'

import { ProjectCard } from '../components/ProjectCard'
import SocialLinks from '../components/AppLayout/SocialLinks'

export function Home() {
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featuredPosts = sortedPosts.slice(0, 2)
  const sortedProjects = allProjects
    .filter(project => !project.archived)
    .sort((a, b) => a.order - b.order)

  return (
    <main className="relative space-y-12 min-inline-0 sm:space-y-16">
      <section className="rounded-3xl border border-ui-line bg-ui-surface p-6 shadow-ui-lg sm:p-8 xl:p-10">
        <div className="grid gap-8">
          <div>
            <div className="flex items-start justify-between gap-4 lg:block">
              <p
                className="
                  text-[0.7rem] font-medium tracking-[0.2em] text-ui-ink/60 uppercase
                  lg:hidden
                "
              >
                Ochuko Ekrresa /<br /> Software engineer
              </p>
            </div>
            <h1
              className="
                mbs-5 font-display text-5xl leading-[0.95] font-medium tracking-[-0.04em] text-ui-ink
                max-inline-4xl
                sm:text-6xl
                lg:text-7xl
              "
            >
              Products. Writing. Experiments.
            </h1>
            <p className="mbs-6 text-base/8 text-ui-muted max-inline-2xl sm:text-lg">
              Building useful products. Designing reliable systems. Sharing insights from lessons
              learned in software and product design.
            </p>

            <div className="mbs-12 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="
                  rounded-2xl bg-ui-ink px-5 py-3 text-sm font-medium text-ui-canvas
                  transition
                  hover:bg-ui-ink/90
                  dark:border dark:border-ui-accent/55 dark:bg-ui-accent
                  dark:text-ui-canvas dark:shadow-ui-accent dark:hover:bg-ui-accent/90
                  dark:hover:shadow-ui-accent-lg
                "
              >
                View projects
              </a>
              <a
                href="/articles"
                className="
                  rounded-2xl border border-ui-line bg-ui-surface-strong px-5 py-3
                  text-sm font-medium text-ui-ink transition hover:border-ui-accent hover:bg-ui-surface-strong hover:text-ui-accent
                "
              >
                Read articles
              </a>
            </div>

            <SocialLinks className="mbs-6 flex items-center justify-start gap-2 lg:hidden" />
          </div>

          <div>
            <a
              href="https://eventdp.com"
              target="_blank"
              rel="noreferrer"
              className="
                group block border-bs border-ui-line pbs-6 transition
                hover:border-ui-accent/45
              "
            >
              <p
                className="
                  text-[0.65rem] font-medium tracking-[0.32em] text-ui-muted uppercase
                "
              >
                Currently building
              </p>
              <p
                className="
                  mbs-4 font-display text-4xl leading-[0.98] font-medium tracking-[-0.035em] text-ui-ink
                  transition-colors
                  group-hover:text-ui-accent
                  sm:text-5xl
                "
              >
                EventDP
              </p>
            </a>
          </div>
        </div>
      </section>

      <section
        id="articles"
        className="
          flex flex-col gap-6
        "
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="border-be-2 border-ui-accent/60 font-sans text-sm font-medium tracking-widest text-ui-ink uppercase">
            Articles
          </h2>

          <a
            href="/articles"
            className="text-sm font-medium text-ui-muted transition hover:text-ui-ink"
          >
            View all
          </a>
        </div>

        <ul className="flex flex-col gap-2">
          {featuredPosts.map(post => (
            <li key={post.slug}>
              <ArticleCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section
        id="projects"
        className="
          flex flex-col gap-6
        "
      >
        <div>
          <h2 className="border-be-2 border-ui-accent/60 font-sans text-sm font-medium tracking-widest text-ui-ink uppercase inline-block">
            Projects
          </h2>
        </div>

        <ul>
          {sortedProjects.map((project, index, array) => {
            const isLast = index === array.length - 1
            return (
              <li key={project.title}>
                <ProjectCard project={project} />
                {!isLast && <div className="my-4 bg-ui-line block-px inline-full" />}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
