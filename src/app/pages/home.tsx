import { ArticleCard } from '@/app/components/ArticleCard'
import { siteMetadata } from '@/app/lib/utils'
import { allPosts, allProjects } from 'content-collections'

import { ThemeToggle } from '../components/ThemeToggle'
import { ProjectCard } from '../components/ProjectCard'

interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
}

const socialLinks: SocialLink[] = [
  { href: siteMetadata.github, label: 'GitHub', icon: <GitHubIcon /> },
  { href: siteMetadata.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
  { href: siteMetadata.twitter, label: 'Twitter', icon: <TwitterIcon /> },
]

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M12 1.5C6.201 1.5 1.5 6.29 1.5 12.198c0 4.726 3.01 8.734 7.186 10.148.525.1.714-.232.714-.516 0-.255-.009-.93-.014-1.825-2.923.651-3.54-1.444-3.54-1.444-.477-1.245-1.166-1.576-1.166-1.576-.953-.666.072-.653.072-.653 1.054.076 1.608 1.112 1.608 1.112.937 1.647 2.458 1.171 3.058.895.095-.696.366-1.171.666-1.44-2.333-.273-4.785-1.188-4.785-5.287 0-1.168.408-2.123 1.077-2.872-.108-.273-.467-1.374.102-2.864 0 0 .879-.288 2.88 1.097A9.837 9.837 0 0 1 12 6.366c.867.004 1.74.12 2.556.352 1.998-1.385 2.876-1.097 2.876-1.097.571 1.49.212 2.59.104 2.864.671.749 1.074 1.704 1.074 2.872 0 4.11-2.457 5.01-4.798 5.278.376.333.711.99.711 1.995 0 1.44-.013 2.602-.013 2.955 0 .286.185.621.72.515 4.172-1.417 7.178-5.423 7.178-10.146C22.5 6.29 17.799 1.5 12 1.5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M4.983 3.5A1.983 1.983 0 1 0 5 7.466 1.983 1.983 0 0 0 4.983 3.5ZM3.75 8.983h2.467V20.5H3.75V8.983ZM10.117 8.983H12.5v1.572h.034c.331-.63 1.142-1.295 2.352-1.295 2.516 0 2.981 1.69 2.981 3.89V20.5H15.4v-6.51c0-1.552-.028-3.548-2.114-3.548-2.117 0-2.442 1.688-2.442 3.435V20.5h-2.467V8.983h1.74Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M18.9 2.25h3.374l-7.371 8.425L23.5 21.75h-6.73l-5.27-6.886-6.024 6.886H2.1l7.883-9.007L1.75 2.25h6.9l4.763 6.292L18.9 2.25Zm-1.182 17.52h1.87L7.643 4.127H5.637L17.718 19.77Z" />
    </svg>
  )
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {socialLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="
            inline-flex size-10 items-center justify-center rounded-full border
            border-ui-line bg-ui-surface text-ui-muted transition
            hover:-translate-y-0.5 hover:border-ui-accent/45 hover:bg-ui-accent/16
            hover:text-ui-ink
          "
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}

export function Home() {
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featuredPosts = sortedPosts.slice(0, 2)
  const sortedProjects = allProjects
    .filter(project => !project.archived)
    .sort((a, b) => a.order - b.order)

  return (
    <main className="relative min-w-0 space-y-12 sm:space-y-16">
      <section
        className="
          rounded-4xl border border-ui-line bg-ui-surface p-6 shadow-ui-lg
          sm:p-8
          xl:p-10
        "
      >
        <div className="grid gap-8">
          <div>
            <div className="flex items-start justify-between gap-4 lg:block">
              <p
                className="
                  text-[0.7rem] font-medium tracking-[0.34em] text-ui-accent uppercase
                  lg:hidden
                "
              >
                Ochuko Ekrresa / Software engineer
              </p>
              <div className="lg:hidden">
                <ThemeToggle />
              </div>
            </div>
            <h1
              className="
                mt-5 max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em]
                text-ui-ink
                sm:text-6xl
                lg:text-7xl
              "
            >
              Products. Writing. Experiments.
            </h1>
            <p className="mt-6 max-w-2xl text-base/8 text-ui-muted sm:text-lg">
              Building useful products. Designing reliable systems. Sharing insights from lessons
              learned in software and product design.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="
                  rounded-full bg-ui-ink px-5 py-3 text-sm font-medium text-ui-canvas
                  transition
                  hover:bg-ui-ink/90
                  dark:border dark:border-ui-accent/55 dark:bg-ui-accent
                  dark:text-ui-canvas dark:shadow-ui-accent
                  dark:hover:-translate-y-0.5 dark:hover:bg-ui-accent/90
                  dark:hover:shadow-ui-accent-lg
                "
              >
                View projects
              </a>
              <a
                href="/articles"
                className="
                  rounded-full border border-ui-line bg-ui-surface-strong px-5 py-3
                  text-sm font-medium text-ui-ink transition
                  hover:-translate-y-0.5 hover:border-ui-line hover:bg-ui-surface-strong
                "
              >
                Read articles
              </a>
            </div>

            <SocialLinks className="mt-6 flex items-center gap-2 lg:hidden" />
          </div>

          <div>
            <a
              href="https://eventdp.com"
              target="_blank"
              rel="noreferrer"
              className="
                group block border-t border-ui-line pt-6 transition
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
                  mt-4 font-display text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-ui-ink
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
        <div className="flex gap-4 items-center justify-between">
          <h2 className="font-sans text-sm font-medium tracking-widest uppercase text-ui-ink border-b-2 border-ui-accent/60">
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-sans text-sm font-medium tracking-widest uppercase text-ui-ink border-b-2 border-ui-accent/60">
              Projects
            </h2>
          </div>
        </div>

        <ul>
          {sortedProjects.map((project, index, array) => {
            const isLast = index === array.length - 1
            return (
              <li key={project.title}>
                <ProjectCard project={project} />
                {!isLast && <div className="my-4 h-px w-full bg-ui-line" />}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
