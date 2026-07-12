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
          shrink-0 transition-transform duration-300 ease-out
          group-hover:scale-[1.02]
        "
      >
        {post.imageId ? (
          <div
            className="
              aspect-square w-24 overflow-hidden rounded-2xl bg-ui-line/50
              sm:w-40
            "
          >
            <img
              src={`${IMAGE_BASE_URL}${post.imageId}`}
              alt={post.imageAlt ?? post.title}
              className="
                size-full object-cover transition-transform duration-500 ease-out
                group-hover:scale-[1.06]
              "
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center py-2 pr-4 sm:pr-6">
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
            mt-2 font-display text-2xl leading-[1.05] tracking-[-0.03em]
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
        <p className="mt-2 line-clamp-2 text-sm/6 text-ui-muted">{post.summary}</p>
      </div>
    </article>
  )
}
