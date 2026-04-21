import { IMAGE_BASE_URL } from '@/app/lib/utils'
import { allPosts } from 'content-collections'

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function ArticleCard({ post }: { post: (typeof allPosts)[number] }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(24,21,17,0.08)] dark:border-white/10 dark:bg-white/6 dark:hover:border-white/16 dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
      {post.imageId ? (
        <div className="aspect-16/10 overflow-hidden border-b border-black/8 bg-black/5 dark:border-white/8 dark:bg-white/6">
          <img
            src={`${IMAGE_BASE_URL}${post.imageId}`}
            alt={post.imageAlt ?? post.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="p-5">
        <span className="text-xs text-muted/70 dark:text-muted/90">
          {formatPostDate(post.date)}
        </span>
        <h2 className="mt-4 font-display text-3xl leading-[1.02] tracking-[-0.04em] text-ink sm:text-[2rem]">
          {post.title}
        </h2>
      </div>
    </article>
  )
}

export function ArticlesPage() {
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg text-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-40 h-80 w-80 rounded-full bg-accent/18 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-white/70 blur-3xl dark:bg-accent/12" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />
      </div>

      <main className="relative mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-10 lg:py-8 xl:px-16">
        <section className="rounded-[2.2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_90px_rgba(24,21,17,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/6 dark:shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-8 xl:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <a
                href="/"
                className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-accent dark:text-[#d1baf0]"
              >
                Home
              </a>
              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">
                Articles on frontend engineering, product thinking, and web craft.
              </h1>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted dark:text-[#c7d1e8] sm:text-base">
              A growing archive of notes, lessons, and ideas from building products for the web.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedPosts.map(post => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
