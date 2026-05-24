import { ArticleCard } from '@/app/components/ArticleCard'
import { allPosts } from 'content-collections'

export function ArticlesPage() {
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="relative">
      <section className="rounded-[2.2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_90px_rgba(24,21,17,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/6 dark:shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-8 xl:p-10">
        <div className="flex flex-col gap-5 mb-20">
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">
            Writing on software, systems, and product design.
          </h1>

          <p className="text-sm leading-7 text-muted dark:text-[#c7d1e8] sm:text-base">
            Sharing what I've learned from building products and running experiments.
          </p>
        </div>

        <ul className="flex flex-col gap-2">
          {sortedPosts.map(post => {
            return (
              <li key={post.slug}>
                <ArticleCard post={post} />

                <div className="my-4 h-px w-full bg-black/8 dark:bg-white/8 last-of-type:hidden" />
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
