import type { DocumentProps } from 'rwsdk/router'

import { siteMetadata } from './lib/utils'
import styles from './styles.css?url'

export function Document({ children, ctx, rw }: DocumentProps) {
	const theme = ctx.theme

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<title>{siteMetadata.title}</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="/src/client.tsx" rel="modulepreload" />
				<link href={styles} rel="stylesheet" />
			</head>
			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						(function() {
							const theme = ${JSON.stringify(theme)};

							const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
							const shouldBeDark = theme === 'dark' || isSystemDark;

							if (shouldBeDark) {
								document.documentElement.setAttribute('data-theme', 'dark');
							} else {
								document.documentElement.setAttribute('data-theme', 'light');
							}
            })();
							`,
					}}
					nonce={rw.nonce}
				/>
				<div id="root">{children}</div>
				<script>import("/src/client.tsx")</script>
			</body>
		</html>
	)
}
