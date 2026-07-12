import { Briefcase, House, Newspaper, type UiIcon } from '../components/ui-icons'

export interface PageIndexItem {
  label: string
  href: string
  icon: UiIcon
  isActive(path: string, hash?: string): boolean
}

export function isHomePath(path: string, hash = '') {
  return path === '/' && hash !== '#projects'
}

export function isArticlesPath(path: string) {
  return path === '/articles' || path.startsWith('/articles/')
}

export function isProjectsPath(path: string, hash = '') {
  return path === '/' && hash === '#projects'
}

export const pageIndexItems: PageIndexItem[] = [
  { label: 'Home', href: '/', icon: House, isActive: isHomePath },
  { label: 'Articles', href: '/articles', icon: Newspaper, isActive: isArticlesPath },
  { label: 'Projects', href: '/#projects', icon: Briefcase, isActive: isProjectsPath },
]
