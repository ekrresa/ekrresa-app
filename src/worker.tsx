import { layout, render, route } from 'rwsdk/router'
import { defineApp } from 'rwsdk/worker'

import { AppLayout } from '@/app/components/AppLayout'
import { Document } from '@/app/Document'
import { setCommonHeaders } from '@/app/headers'
import { About } from '@/app/pages/About'
import { Blog } from '@/app/pages/Blog'
import { Home } from '@/app/pages/Home'
import { Projects } from '@/app/pages/Projects'

export default defineApp([
	setCommonHeaders(),
	render(Document, [
		layout(AppLayout, [
			route('/', Home),
			route('/blog', Blog),
			route('/projects', Projects),
			route('/about', About),
		]),
	]),
])
