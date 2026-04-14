import styles from './styles.css?url'
import type { DocumentProps } from 'rwsdk/router'

export function Document({ children, ctx }: DocumentProps) {
  const theme = ctx.theme

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <title>Ochuko Ekrresa | Software Engineer</title>
        <meta
          name="description"
          content="Editorial portfolio for Ochuko Ekrresa, focused on projects, articles, and thoughtful web experiences."
        />
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
