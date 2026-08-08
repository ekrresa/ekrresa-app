import styles from './styles.css?url'
import type { DocumentProps } from 'rwsdk/router'
import { allPosts } from 'content-collections'
import { siteMetadata } from '@/app/lib/utils'

const ARTICLE_OG_TEMPLATE_VERSION = 2

function hashString(value: string) {
  let hash = 5381

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index)
  }

  return (hash >>> 0).toString(36)
}

export function Document({ children, ctx, request }: DocumentProps) {
  const theme = ctx.theme
  const articleSlug = new URL(request.url).pathname.match(/^\/articles\/([^/]+)\/?$/)?.[1]
  const article = articleSlug ? allPosts.find(post => post.slug === articleSlug) : undefined
  const pageTitle = article ? `${article.title} | ${siteMetadata.title}` : siteMetadata.title
  const pageDescription = article?.summary ?? siteMetadata.description
  const pageUrl = article
    ? `${siteMetadata.siteUrl}/articles/${article.slug}`
    : siteMetadata.siteUrl
  const socialImage = article
    ? `${siteMetadata.siteUrl}/articles/${article.slug}/og.png?v=${ARTICLE_OG_TEMPLATE_VERSION}-${hashString(article.title)}`
    : siteMetadata.socialBanner
  const socialImageAlt = article ? article.title : 'Ochuko Ekrresa — Software Engineer'

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content={article ? 'article' : 'website'} />
        <meta property="og:site_name" content="Ochuko Ekrresa" />
        <meta property="og:locale" content={siteMetadata.locale} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={socialImageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteMetadata.twitterHandle} />
        <meta name="twitter:creator" content={siteMetadata.twitterHandle} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
        <meta name="twitter:image:alt" content={socialImageAlt} />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
        <link rel="stylesheet" href={styles} />
        <link rel="modulepreload" href="/src/client.tsx" />
      </head>
      <body>
        {children}
        <script type="module" src="/src/client.tsx"></script>
      </body>
    </html>
  )
}
