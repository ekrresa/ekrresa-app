import { layout, render, route } from 'rwsdk/router'
import { defineApp } from 'rwsdk/worker'
import 'core-js/actual/array/to-sorted'

import { AppLayout } from '@/app/components/AppLayout'
import type { Theme } from '@/app/components/ThemeProvider'
import { Document } from '@/app/Document'
import { setCommonHeaders } from '@/app/headers'
import { About } from '@/app/pages/About'
import { Blog } from '@/app/pages/Blog'
import { BlogPost } from '@/app/pages/BlogPost'
import { Home } from '@/app/pages/Home'
import { Projects } from '@/app/pages/Projects'

export interface AppContext {
	theme: Theme
}

export default defineApp([
	setCommonHeaders(),
	async function setTheme({ ctx, request }) {
		// Extract the theme from the cookie
		const theme =
			request.headers
				.get('cookie')
				?.split(';')
				.find(cookie => cookie.trim().startsWith('theme='))
				?.split('=')[1] ?? 'light'

		ctx.theme = theme as Theme
	},
	render(Document, [
		layout(AppLayout, [
			route('/', Home),
			route('/blog', Blog),
			route('/blog/:slug', BlogPost),
			route('/projects', Projects),
			route('/about', About),
		]),
	]),
])
