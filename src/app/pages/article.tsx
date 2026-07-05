import { allPosts } from 'content-collections'
import { mdxParse } from 'safe-mdx/parse'
import { SafeMdxRenderer } from 'safe-mdx'
import { components } from '../components/MDXComponents'
import { highlight } from 'sugar-high'
import CopyCode from '../components/CopyCode'
import { IMAGE_BASE_URL } from '../lib/utils'

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function ArticleCredit({ credit }: { credit: string }) {
  const creditMdast = mdxParse(credit)

  if (!creditMdast) {
    return null
  }

  return (
    <div
      className="
        prose prose-sm max-w-none text-[0.78rem]
        prose-p:m-0 prose-p:text-ui-muted
        prose-a:text-ui-accent prose-a:decoration-ui-accent/30 prose-a:underline-offset-4
        hover:prose-a:text-ui-ink
      "
    >
      <SafeMdxRenderer markdown={credit} mdast={creditMdast} components={components} />
    </div>
  )
}

function MissingArticle() {
  return (
    <main className="relative">
      <section
        className="
          rounded-[2.2rem] border border-ui-line bg-ui-surface p-8 shadow-ui-xl
          backdrop-blur-sm
          sm:p-10
        "
      >
        <p className="text-sm tracking-[0.3em] text-ui-accent uppercase">Article</p>
        <h1
          className="
            mt-5 font-display text-4xl leading-[0.96] tracking-[-0.04em] text-ui-ink
            sm:text-5xl
          "
        >
          Post not found
        </h1>
        <p className="mt-5 max-w-2xl text-sm/7 text-ui-muted sm:text-base">
          Sorry, this article does not exist or is no longer available.
        </p>
      </section>
    </main>
  )
}

export function Article({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === params.slug)
  if (!post) {
    return <MissingArticle />
  }

  const mdast = mdxParse(post.content)

  if (!mdast) {
    return <MissingArticle />
  }

  return (
    <main className="relative space-y-6">
      <section
        className="
          overflow-hidden rounded-[2.2rem] border border-ui-line bg-ui-surface p-6
          shadow-ui-xl backdrop-blur-sm
          sm:p-8
          xl:p-10
        "
      >
        <div className="relative">
          <div
            className="
              pointer-events-none absolute top-4 -right-16 size-40 rounded-full
              bg-ui-accent/10 blur-3xl
              dark:bg-ui-accent/16
            "
          />
          <div className="relative">
            <header className="max-w-4xl">
              <a
                href="/articles"
                className="
                  mb-10 inline-flex items-center rounded-full border border-ui-line
                  bg-ui-surface px-3 py-1.5 text-xs font-medium tracking-[0.22em]
                  text-ui-muted uppercase transition
                  hover:border-ui-line hover:bg-ui-surface-strong hover:text-ui-ink
                "
              >
                All articles
              </a>

              <h1
                className="
                  max-w-3xl font-display text-4xl leading-[0.95] tracking-[-0.04em]
                  text-ui-ink
                  sm:text-5xl
                  xl:text-[4.25rem]
                "
              >
                {post.title}
              </h1>

              <div
                className="
                  mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ui-muted
                "
              >
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {post.updatedAt ? (
                  <>
                    <span aria-hidden="true" className="size-1 rounded-full bg-current/45" />
                    <span>Updated {formatPostDate(post.updatedAt)}</span>
                  </>
                ) : null}
              </div>
            </header>
          </div>
        </div>

        {post.imageId ? (
          <figure
            className="
              relative mt-10 overflow-hidden rounded-4xl border border-ui-line
              bg-ui-line/50 shadow-ui-lg
            "
          >
            <img
              src={`${IMAGE_BASE_URL}${post.imageId}`}
              alt={post.imageAlt || post.title}
              className="aspect-[16/8.8] w-full object-cover"
            />
            {post.imageCredit ? (
              <figcaption
                className="
                absolute inset-x-0 bottom-0 bg-ui-surface/70 px-5 pt-16 pb-3
              "
              >
                <ArticleCredit credit={post.imageCredit} />
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </section>

      <article
        className="
          rounded-4xl border border-ui-line bg-ui-surface p-6 shadow-ui-lg
          backdrop-blur-sm
          sm:p-8
          lg:p-10
        "
      >
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-ui-ink
            prose-p:leading-8 prose-p:text-ui-muted
            prose-a:text-ui-accent prose-a:decoration-ui-accent/30
            prose-a:underline-offset-4
            hover:prose-a:text-ui-ink
            prose-blockquote:border-l-ui-accent/40 prose-blockquote:text-ui-ink
            prose-figcaption:text-ui-muted
            prose-strong:text-ui-ink
            prose-code:text-ui-ink
            prose-li:leading-8 prose-li:text-ui-muted
            prose-hr:border-ui-line
          "
        >
          <SafeMdxRenderer
            markdown={post.content}
            mdast={mdast}
            components={components}
            renderNode={node => {
              if (node.type === 'code') {
                const html = highlight(node.value)

                return (
                  <pre
                    className="
                      relative overflow-x-auto rounded-3xl border border-ui-line
                      bg-gray-800 p-5 shadow-ui-code
                      dark:bg-ui-surface
                    "
                  >
                    <CopyCode code={node.value} />
                    <code dangerouslySetInnerHTML={{ __html: html }} />
                  </pre>
                )
              }
            }}
          />
        </div>
      </article>
    </main>
  )
}
