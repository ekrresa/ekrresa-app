import { ArticleCard } from '@/app/components/ArticleCard'
import { allPosts } from 'content-collections'

export function ArticlesPage() {
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="relative">
      <section className="pbs-4 sm:pbs-8">
        <div className="mbe-20 flex flex-col gap-5">
          <a
            href="/"
            className="
              mbe-5 self-start inline-flex items-center border-be border-ui-line pbe-2 text-xs
              font-medium tracking-[0.22em] text-ui-muted uppercase transition
              hover:border-ui-accent hover:text-ui-ink
            "
          >
            Home
          </a>

          <h1
            className="
              mbs-4 font-display text-5xl leading-[0.95] tracking-[-0.04em] text-ui-ink
              max-inline-4xl
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
                {!isLast && <div className="my-4 bg-ui-line block-px inline-full" />}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
