import { IMAGE_BASE_URL, siteMetadata } from '@/app/lib/utils'
import { allPosts, allProjects } from 'content-collections'

interface PageIndexItem {
  id: string
  label: string
  href: string
  note: string
}

interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
}

const pageIndexItems: PageIndexItem[] = [
  { id: '01', label: 'Home', href: '#home', note: 'Point of view, tone, and first impression' },
  {
    id: '02',
    label: 'Articles',
    href: '#articles',
    note: 'Essays on craft, product thinking, and the web',
  },
  {
    id: '03',
    label: 'Projects',
    href: '#projects',
    note: 'Project previews, experiments, and small useful tools',
  },
]

const socialLinks: SocialLink[] = [
  { href: siteMetadata.github, label: 'GitHub', icon: <GitHubIcon /> },
  { href: siteMetadata.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
  { href: siteMetadata.twitter, label: 'Twitter', icon: <TwitterIcon /> },
]

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 1.5C6.201 1.5 1.5 6.29 1.5 12.198c0 4.726 3.01 8.734 7.186 10.148.525.1.714-.232.714-.516 0-.255-.009-.93-.014-1.825-2.923.651-3.54-1.444-3.54-1.444-.477-1.245-1.166-1.576-1.166-1.576-.953-.666.072-.653.072-.653 1.054.076 1.608 1.112 1.608 1.112.937 1.647 2.458 1.171 3.058.895.095-.696.366-1.171.666-1.44-2.333-.273-4.785-1.188-4.785-5.287 0-1.168.408-2.123 1.077-2.872-.108-.273-.467-1.374.102-2.864 0 0 .879-.288 2.88 1.097A9.837 9.837 0 0 1 12 6.366c.867.004 1.74.12 2.556.352 1.998-1.385 2.876-1.097 2.876-1.097.571 1.49.212 2.59.104 2.864.671.749 1.074 1.704 1.074 2.872 0 4.11-2.457 5.01-4.798 5.278.376.333.711.99.711 1.995 0 1.44-.013 2.602-.013 2.955 0 .286.185.621.72.515 4.172-1.417 7.178-5.423 7.178-10.146C22.5 6.29 17.799 1.5 12 1.5Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M4.983 3.5A1.983 1.983 0 1 0 5 7.466 1.983 1.983 0 0 0 4.983 3.5ZM3.75 8.983h2.467V20.5H3.75V8.983ZM10.117 8.983H12.5v1.572h.034c.331-.63 1.142-1.295 2.352-1.295 2.516 0 2.981 1.69 2.981 3.89V20.5H15.4v-6.51c0-1.552-.028-3.548-2.114-3.548-2.117 0-2.442 1.688-2.442 3.435V20.5h-2.467V8.983h1.74Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/72 text-muted transition hover:-translate-y-0.5 hover:border-black/20 hover:bg-white hover:text-ink"
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}

function ArticleCard({ post }: { post: (typeof allPosts)[number] }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(24,21,17,0.08)]">
      {post.imageId ? (
        <div className="aspect-16/10 overflow-hidden border-b border-black/8 bg-black/5">
          <img
            src={`${IMAGE_BASE_URL}${post.imageId}`}
            alt={post.imageAlt ?? post.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs text-muted/70">{formatPostDate(post.date)}</span>
        </div>

        <h3 className="mt-4 font-display text-3xl leading-[1.02] tracking-[-0.04em] text-ink sm:text-[2rem]">
          {post.title}
        </h3>
      </div>
    </article>
  )
}

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function formatProjectHost(link: string) {
  return new URL(link).hostname.replace(/^www\./, '')
}

export function Home() {
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const featuredPosts = sortedPosts.slice(0, 3)
  const sortedProjects = allProjects
    .filter(project => !project.archived)
    .sort((a, b) => a.order - b.order)

  return (
    <div id="home" className="relative min-h-screen overflow-x-clip bg-bg text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-40 h-80 w-80 rounded-full bg-accent/18 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-5 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-10 lg:py-8 xl:px-16">
        <aside className="hidden lg:sticky lg:top-8 lg:block lg:h-fit">
          <div className="rounded-4xl border border-black/10 bg-white/55 p-5 shadow-[0_20px_80px_rgba(24,21,17,0.08)] backdrop-blur">
            <div className="mb-6 border-b border-black/8 pb-5">
              <div className="flex items-center gap-3">
                <img
                  src="/icons/logo-light.svg"
                  alt="Ochuko Ekrresa logo"
                  className="h-8 w-8 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-muted">
                    Ochuko Ekrresa
                  </p>
                  <p className="mt-1 text-sm text-muted/85">Software engineer</p>
                </div>
              </div>
              <p className="mt-4 max-w-44 text-sm leading-6 text-muted/78">
                Thoughtful interfaces, product-minded systems, calm interaction design.
              </p>
              <SocialLinks className="mt-4 flex items-center gap-2" />
            </div>

            <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-muted">
              Page index
            </p>
            <div className="mt-6 space-y-3">
              {pageIndexItems.map(item => (
                <a
                  key={item.id}
                  href={item.href}
                  className="group block rounded-3xl border border-black/8 bg-white/70 px-4 py-4 transition hover:-translate-y-0.5 hover:border-black/15 hover:bg-white"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-[0.65rem] font-medium tracking-[0.22em] text-muted">
                      {item.id}
                    </span>
                    <span className="block">
                      <span className="block text-sm font-medium text-ink">{item.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-muted">{item.note}</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-black/8 bg-ink px-4 py-5 text-white shadow-[0_18px_40px_rgba(24,21,17,0.16)]">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/60">
                Why this works
              </p>
              <p className="mt-3 text-sm leading-6 text-white/78">
                The navigation lives inside the composition instead of sitting above it, so the page
                feels authored before it feels navigated.
              </p>
            </div>
          </div>
        </aside>

        <main className="relative min-w-0 space-y-6 lg:space-y-8">
          <section className="rounded-[2.2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_90px_rgba(24,21,17,0.08)] backdrop-blur sm:p-8 xl:p-10">
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_20rem] xl:items-end">
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-accent lg:hidden">
                  Ochuko Ekrresa / Software engineer
                </p>
                <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl">
                  Building thoughtful products for the web with clarity, craft, and care.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  I&apos;m Ochuko, a software engineer focused on building useful web experiences,
                  refining frontend systems, and sharing what I learn about web development, best
                  practices, and product thinking.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
                  >
                    View projects
                  </a>
                  <a
                    href="#articles"
                    className="rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-medium text-ink transition hover:border-black/20 hover:bg-white"
                  >
                    Read articles
                  </a>
                  <a
                    href="#story"
                    className="rounded-full border border-transparent px-2 py-3 text-sm font-medium text-muted transition hover:text-ink"
                  >
                    About me
                  </a>
                </div>

                <SocialLinks className="mt-6 flex items-center gap-2 lg:hidden" />
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.75rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(247,240,232,0.95))] p-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Currently building
                  </p>
                  <p className="mt-3 font-display text-3xl leading-none tracking-[-0.04em] text-ink">
                    DateTime Dojo
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                    A focused utility for transforming dates fast, with a product mindset around
                    clarity, speed, and everyday usefulness.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-3xl border border-black/10 bg-white/80 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted">Build</p>
                    <p className="mt-3 text-sm leading-6 text-ink">Useful products for the web</p>
                  </div>
                  <div className="rounded-3xl border border-black/10 bg-white/80 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted">Write</p>
                    <p className="mt-3 text-sm leading-6 text-ink">
                      Lessons, practice, and process
                    </p>
                  </div>
                  <div className="rounded-3xl border border-black/10 bg-accent/10 p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted">Focus</p>
                    <p className="mt-3 text-sm leading-6 text-ink">
                      Frontend quality and product detail
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="story"
            className="grid gap-6 rounded-[2.2rem] border border-black/10 bg-white/60 p-6 shadow-[0_16px_60px_rgba(24,21,17,0.06)] backdrop-blur sm:p-8 xl:grid-cols-[minmax(0,1.1fr)_22rem]"
          >
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-accent">
                About me
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-[-0.04em] text-ink">
                I like building web products that feel clear, useful, and carefully considered.
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-muted sm:text-base">
              <p>
                My work sits at the intersection of engineering, product thinking, and interface
                craft. I care about the details that make software easier to use, easier to trust,
                and easier to grow over time.
              </p>
              <p>
                I enjoy turning rough ideas into polished experiences, building frontend systems
                that scale well, and writing about what I learn along the way so the process stays
                as thoughtful as the final result.
              </p>
            </div>
          </section>

          <section
            id="articles"
            className="rounded-[2.2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(251,246,240,0.95))] p-6 shadow-[0_16px_60px_rgba(24,21,17,0.06)] sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-accent">
                  Articles
                </p>
                <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-ink">
                  Writing that reads like field notes, not filler.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted sm:text-base">
                Recent writing on frontend engineering, product thinking, and the details that make
                software more useful.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredPosts.map(post => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          <section
            id="projects"
            className="rounded-[2.2rem] border border-black/10 bg-white/68 p-6 shadow-[0_16px_60px_rgba(24,21,17,0.06)] backdrop-blur sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-accent">
                  Projects
                </p>
                <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-ink">
                  Selected projects.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted sm:text-base">
                Live product previews that link straight to the work.
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              {sortedProjects.map(project => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.75rem] border border-black/10 bg-white/85 p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(24,21,17,0.08)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-3xl leading-none tracking-[-0.04em] text-ink">
                      {project.title}
                    </h3>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-accent">
                      {formatProjectHost(project.link)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{project.summary}</p>
                  <p className="mt-5 text-sm font-medium text-ink">Open project</p>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-20 lg:hidden">
        <nav className="mx-auto flex max-w-md items-center justify-between gap-2 rounded-full border border-black/10 bg-white/88 p-2 shadow-[0_18px_45px_rgba(24,21,17,0.12)] backdrop-blur">
          {pageIndexItems.map(item => (
            <a
              key={item.id}
              href={item.href}
              className="flex-1 rounded-full px-4 py-3 text-center text-sm font-medium text-ink transition hover:bg-black/5"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
