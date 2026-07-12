import { IMAGE_BASE_URL } from '@/app/lib/utils'
import { type Post } from 'content-collections'

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

interface ArticleCardProps {
  post: Post
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article
      className="
        group -mx-3 flex translate-x-0 items-center gap-4 overflow-hidden rounded-3xl p-3
        transition-all duration-300 ease-out
        hover:translate-x-1 hover:bg-ui-line/40
        sm:gap-6 sm:py-4
      "
    >
      <div
        className="
          hidden shrink-0 transition-transform duration-300
          ease-out group-hover:scale-[1.02] sm:block
        "
      >
        {post.imageId ? (
          <div
            className="
              aspect-square overflow-hidden rounded-2xl bg-ui-line/50 inline-24
              sm:inline-40
            "
          >
            <img
              src={`${IMAGE_BASE_URL}${post.imageId}`}
              alt={post.imageAlt ?? post.title}
              className="
                object-cover transition-transform duration-500 ease-out block-full inline-full
                group-hover:scale-[1.06]
              "
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center py-2 pe-4 sm:pe-6">
        <span
          className="
            text-xs text-ui-muted/70 transition-colors duration-300 ease-out
            group-hover:text-ui-muted
          "
        >
          {formatPostDate(post.date)}
        </span>
        <h2
          className="
            mbs-2 font-display text-2xl leading-[1.05] tracking-[-0.03em]
            sm:text-[1.75rem]
          "
        >
          <a
            href={`/articles/${post.slug}`}
            className="
              text-ui-ink transition-colors duration-300 ease-out
              hover:text-ui-accent
            "
          >
            {post.title}
          </a>
        </h2>
        <p className="mbs-2 line-clamp-2 text-base/6 text-ui-muted">{post.summary}</p>
      </div>
    </article>
  )
}
