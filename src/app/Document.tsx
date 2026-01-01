import type { DocumentProps } from 'rwsdk/router'

import styles from './styles.css?url'

export function Document({ children }: DocumentProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<title>RedwoodJS Starter</title>
				<link href="/src/client.tsx" rel="modulepreload" />
				<link href={styles} rel="stylesheet" />
			</head>
			<body>
				<div id="root">{children}</div>
				<script>import("/src/client.tsx")</script>
			</body>
		</html>
	)
}
