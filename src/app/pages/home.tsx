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
            inline-flex size-10 items-center justify-center rounded-full border border-black/10
            bg-white/72 text-muted transition
            hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:text-ink
            dark:border-white/10 dark:bg-white/8 dark:text-muted
            dark:hover:border-[#8fa0ea]/45 dark:hover:bg-[#8fa0ea]/16 dark:hover:text-white
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
    <main
      className="
        relative min-w-0 space-y-6
        lg:space-y-8
      "
    >
      <section
        className="
          rounded-[2.2rem] border border-black/10 bg-white/70 p-6
          shadow-[0_24px_90px_rgba(24,21,17,0.08)] backdrop-blur-sm
          sm:p-8
          xl:p-10
          dark:border-white/10 dark:bg-white/6 dark:shadow-[0_28px_90px_rgba(0,0,0,0.35)]
        "
      >
        <div className="grid gap-8">
          <div>
            <div
              className="
                flex items-start justify-between gap-4
                lg:block
              "
            >
              <p
                className="
                  text-[0.7rem] font-medium tracking-[0.34em] text-accent uppercase
                  lg:hidden
                  dark:text-[#d1baf0]
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
                mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-ink
                sm:text-6xl
                lg:text-7xl
              "
            >
              Products. Writing. Experiments.
            </h1>
            <p
              className="
                mt-6 max-w-2xl text-base/8 text-muted
                sm:text-lg
                dark:text-[#c7d1e8]
              "
            >
              Building useful products. Designing reliable systems. Sharing insights from lessons
              learned in software and product design.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="
                  rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition
                  hover:bg-black
                  dark:border dark:border-[#a5b2ec]/55 dark:bg-[#8fa0ea] dark:text-[#0e1525]
                  dark:shadow-[0_18px_40px_rgba(127,144,218,0.28)]
                  dark:hover:-translate-y-0.5 dark:hover:bg-[#a5b2ec]
                  dark:hover:shadow-[0_22px_46px_rgba(127,144,218,0.34)]
                "
              >
                View projects
              </a>
              <a
                href="/articles"
                className="
                  rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-medium
                  text-ink transition
                  hover:border-black/20 hover:bg-white
                  dark:border-white/14 dark:bg-white/9 dark:text-[#dbe4ff]
                  dark:hover:-translate-y-0.5 dark:hover:border-white/24 dark:hover:bg-white/14
                "
              >
                Read articles
              </a>
            </div>

            <SocialLinks
              className="
                mt-6 flex items-center gap-2
                lg:hidden
              "
            />
          </div>

          <div>
            <a
              href="https://eventdp.com"
              target="_blank"
              rel="noreferrer"
              className="
                relative block overflow-hidden rounded-4xl border border-black/10
                bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,240,232,0.98))] p-6
                shadow-[0_18px_50px_rgba(24,21,17,0.06)] transition
                hover:-translate-y-0.5 hover:border-black/15
                hover:shadow-[0_24px_60px_rgba(24,21,17,0.08)]
                sm:px-7
                dark:border-white/10
                dark:bg-[linear-gradient(180deg,rgba(24,32,51,0.92),rgba(14,19,31,0.98))]
                dark:hover:border-white/16 dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]
              "
            >
              <div
                className="
                  pointer-events-none absolute top-1/2 -right-10 size-32 -translate-y-1/2
                  rounded-full bg-accent/12 blur-3xl
                  dark:bg-accent/18
                "
              />

              <div
                className="
                  relative flex flex-col gap-5
                  sm:flex-row sm:items-end sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[0.65rem] font-medium tracking-[0.32em] text-muted uppercase
                      dark:text-[#d1daef]
                    "
                  >
                    Currently building
                  </p>
                  <p
                    className="
                      mt-4 font-display text-4xl leading-none tracking-tighter text-ink
                      sm:text-5xl
                    "
                  >
                    EventDP
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section
        id="articles"
        className="
          rounded-[2.2rem] border border-black/10
          bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,246,240,0.95))] p-6
          shadow-[0_16px_60px_rgba(24,21,17,0.06)]
          sm:p-8
          dark:border-white/10
          dark:bg-[linear-gradient(180deg,rgba(23,30,47,0.88),rgba(14,19,31,0.96))]
          dark:shadow-[0_18px_60px_rgba(0,0,0,0.3)]
        "
      >
        <div
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-end sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-sm tracking-widest text-accent uppercase
                dark:text-[#d1baf0]
              "
            >
              Articles
            </p>
          </div>
          <a
            href="/articles"
            className="
              text-sm font-medium text-muted transition
              hover:text-ink
              dark:text-[#c7d1e8]
              dark:hover:text-white
            "
          >
            View all articles
          </a>
        </div>

        <ul className="mt-8 flex flex-col gap-2">
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
          rounded-[2.2rem] border border-black/10 bg-white/68 p-6
          shadow-[0_16px_60px_rgba(24,21,17,0.06)] backdrop-blur-sm
          sm:p-8
          dark:border-white/10 dark:bg-white/6 dark:shadow-[0_18px_60px_rgba(0,0,0,0.3)]
        "
      >
        <div
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-end sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-sm tracking-widest text-accent uppercase
                dark:text-[#d1baf0]
              "
            >
              Projects
            </p>
          </div>
        </div>

        <ul className="mt-6">
          {sortedProjects.map((project, index, array) => {
            const isLast = index === array.length - 1
            return (
              <li key={project.title}>
                <ProjectCard project={project} />
                {!isLast && (
                  <div
                    className="
                      my-4 h-px w-full bg-black/8
                      dark:bg-white/8
                    "
                  />
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
