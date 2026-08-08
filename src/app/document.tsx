import styles from './styles.css?url'
import type { DocumentProps } from 'rwsdk/router'
import { getPageMetadata, siteMetadata } from '@/app/lib/utils'

export function Document({ children, ctx, request }: DocumentProps) {
  const theme = ctx.theme

  const { article, pageTitle, pageDescription, pageUrl, socialImage, socialImageAlt } =
    getPageMetadata(request.url)

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
