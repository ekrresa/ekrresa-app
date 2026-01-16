'use server'

import { requestInfo } from 'rwsdk/worker'

export function setThemeCookie(theme: 'dark' | 'light') {
	requestInfo.response.headers.set(
		'Set-Cookie',
		`theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`,
	)
}
