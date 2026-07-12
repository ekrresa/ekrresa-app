import { ArticleCard } from '@/app/components/ArticleCard'
import { allPosts } from 'content-collections'

export function ArticlesPage() {
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="relative">
      <section className="pt-4 sm:pt-8">
        <div className="mb-20 flex flex-col gap-5">
          <h1
            className="
              mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.04em]
              text-ui-ink
              sm:text-6xl
            "
          >
            Writing on software, systems, and product design.
          </h1>

          <p className="text-sm/7 text-ui-muted sm:text-base">
            Sharing what I’ve learned from building products and running experiments.
          </p>
        </div>

        <ul>
          {sortedPosts.map((post, index) => {
            const isLast = index === sortedPosts.length - 1

            return (
              <li key={post.slug}>
                <ArticleCard post={post} />
                {!isLast && <div className="my-4 h-px w-full bg-ui-line" />}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
