import styles from './styles.css?url'

interface DocumentProps {
  children: React.ReactNode
}

export function Document({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <script>import("/src/client.tsx")</script>
      </body>
    </html>
  )
}
