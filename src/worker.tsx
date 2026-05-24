import { layout, render, route } from 'rwsdk/router'
import { defineApp } from 'rwsdk/worker'
import 'core-js/actual/array/to-sorted'

import { Document } from '@/app/document'
import { setCommonHeaders } from '@/app/headers'
import { ArticlesPage } from '@/app/pages/articles'
import { Home } from '@/app/pages/home'
import { type Theme } from './app/components/ThemeProvider'
import AppLayout from './app/components/AppLayout'
import { Article } from './app/pages/article'

export type AppContext = {
  theme: Theme
}

export default defineApp([
  setCommonHeaders(),
  function setTheme({ ctx, request }) {
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
      route('/articles', ArticlesPage),
      route('/articles/:slug', Article),
    ]),
  ]),
])
