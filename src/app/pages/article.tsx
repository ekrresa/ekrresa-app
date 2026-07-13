import { allPosts } from 'content-collections'
import { mdxParse } from 'safe-mdx/parse'
import { SafeMdxRenderer } from 'safe-mdx'
import { components } from '../components/MDXComponents'
import { highlight } from 'sugar-high'
import { BackLink } from '../components/BackLink'
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
        prose prose-sm text-[0.78rem] max-inline-none
        prose-p:m-0 prose-p:text-white/85
        prose-a:text-white prose-a:decoration-white/40 prose-a:underline-offset-4
        hover:prose-a:text-white
      "
    >
      <SafeMdxRenderer markdown={credit} mdast={creditMdast} components={components} />
    </div>
  )
}

function MissingArticle() {
  return (
    <main className="relative">
      <section className="border-bs border-ui-line pbs-10 sm:pbs-12">
        <p className="text-sm tracking-[0.3em] text-ui-accent uppercase">Article</p>
        <h1
          className="
            mbs-5 font-display text-4xl leading-[0.96] tracking-[-0.04em] text-ui-ink
            sm:text-5xl
          "
        >
          Post not found
        </h1>
        <p className="mbs-5 text-sm/7 text-ui-muted max-inline-2xl sm:text-base">
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
    <main className="relative space-y-12">
      <section className="pbs-4 lg:pbs-2">
        <header className="max-inline-4xl">
          <BackLink href="/articles" className="mbe-10">
            All articles
          </BackLink>

          <h1 className="font-display text-4xl leading-[0.95] tracking-[-0.04em] text-ui-ink max-inline-3xl md:text-5xl xl:text-6xl">
            {post.title}
          </h1>

          <div
            className="
              mbs-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ui-muted
            "
          >
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.updatedAt ? (
              <>
                <span aria-hidden="true" className="rounded-full bg-current/45 block-1 inline-1" />
                <span>Updated {formatPostDate(post.updatedAt)}</span>
              </>
            ) : null}
          </div>
        </header>

        {post.imageId ? (
          <figure className="relative mbs-10 overflow-hidden rounded-3xl border border-ui-line bg-ui-surface">
            <img
              src={`${IMAGE_BASE_URL}${post.imageId}`}
              alt={post.imageAlt || post.title}
              className="aspect-[16/8.8] object-cover inline-full"
            />
            {post.imageCredit ? (
              <figcaption className="absolute inset-x-0 inset-be-0 bg-linear-to-t from-black/55 via-black/20 to-transparent px-5 pbs-16 pbe-3">
                <ArticleCredit credit={post.imageCredit} />
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </section>

      <article className="pbs-8">
        <div
          className="
            prose prose-lg max-inline-none
            prose-headings:font-display prose-headings:font-medium prose-headings:text-ui-ink
            prose-p:leading-8 prose-p:text-ui-muted
            prose-a:text-ui-accent prose-a:decoration-ui-accent/30
            prose-a:underline-offset-4
            hover:prose-a:text-ui-ink
            prose-blockquote:border-s-ui-accent/40 prose-blockquote:text-ui-ink
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
                  <div className="relative">
                    <CopyCode code={node.value} />

                    <pre className="overflow-x-auto rounded-xl border border-ui-line bg-gray-800 p-5 shadow-ui-code dark:bg-ui-surface">
                      <code dangerouslySetInnerHTML={{ __html: html }} />
                    </pre>
                  </div>
                )
              }
            }}
          />
        </div>
      </article>
    </main>
  )
}
