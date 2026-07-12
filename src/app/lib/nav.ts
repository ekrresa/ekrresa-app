import { HouseLineIcon, NewspaperIcon, BriefcaseIcon, type Icon } from '@phosphor-icons/react'

export interface PageIndexItem {
  label: string
  href: string
  icon: Icon
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
  { label: 'Home', href: '/', icon: HouseLineIcon, isActive: isHomePath },
  { label: 'Articles', href: '/articles', icon: NewspaperIcon, isActive: isArticlesPath },
  { label: 'Projects', href: '/#projects', icon: BriefcaseIcon, isActive: isProjectsPath },
]
