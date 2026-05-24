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

function MissingArticle() {
  return (
    <main className="relative">
      <section className="rounded-[2.2rem] border border-black/10 bg-white/70 p-8 shadow-[0_24px_90px_rgba(24,21,17,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/6 dark:shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-accent dark:text-[#d1baf0]">
          Article
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[0.96] tracking-[-0.04em] text-ink sm:text-5xl">
          Post not found
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted dark:text-[#c7d1e8] sm:text-base">
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
      <section className="overflow-hidden rounded-[2.2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(250,244,238,0.96))] p-6 shadow-[0_24px_90px_rgba(24,21,17,0.08)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(23,30,47,0.88),rgba(13,18,30,0.98))] dark:shadow-[0_28px_90px_rgba(0,0,0,0.35)] sm:p-8 xl:p-10">
        <div className="relative">
          <div className="pointer-events-none absolute -right-16 top-4 h-40 w-40 rounded-full bg-accent/10 blur-3xl dark:bg-[#8fa0ea]/16" />
          <div className="relative">
            <header className="max-w-4xl">
              <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted dark:text-[#c7d1e8]">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </div>
            </header>
          </div>
        </div>

        {post.imageId ? (
          <div className="mt-10 overflow-hidden rounded-4xl border border-black/8 bg-black/5 shadow-[0_20px_60px_rgba(24,21,17,0.08)] dark:border-white/10 dark:bg-white/6 dark:shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <img
              src={`${IMAGE_BASE_URL}${post.imageId}`}
              alt={post.imageAlt || post.title}
              className="aspect-[16/8.8] w-full object-cover"
            />
          </div>
        ) : null}
      </section>

      <article className="rounded-4xl border border-black/10 bg-white/68 p-6 shadow-[0_16px_60px_rgba(24,21,17,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/6 dark:shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:p-8 lg:p-10">
        <div className="prose prose-lg max-w-none prose-code:text-ink dark:prose-code:text-[#eef3ff] prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-p:leading-8 prose-li:text-muted prose-li:leading-8 prose-strong:text-ink prose-a:text-accent prose-a:decoration-accent/30 prose-a:underline-offset-4 hover:prose-a:text-ink prose-blockquote:border-l-accent/40 prose-blockquote:text-ink prose-figcaption:text-muted prose-hr:border-black/8 dark:prose-headings:text-white dark:prose-p:text-[#c7d1e8] dark:prose-li:text-[#c7d1e8] dark:prose-strong:text-white dark:prose-a:text-[#d9c8f1] dark:hover:prose-a:text-white dark:prose-blockquote:border-l-[#8fa0ea]/40 dark:prose-blockquote:text-[#eef3ff] dark:prose-figcaption:text-[#c7d1e8] dark:prose-hr:border-white/8">
          <SafeMdxRenderer
            markdown={post.content}
            mdast={mdast}
            components={components}
            renderNode={node => {
              if (node.type === 'code') {
                const html = highlight(node.value)

                return (
                  <pre className="relative bg-gray-800 dark:bg-white/6 overflow-x-auto rounded-3xl border border-black/8 p-5 shadow-[0_18px_50px_rgba(24,21,17,0.18)]">
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
