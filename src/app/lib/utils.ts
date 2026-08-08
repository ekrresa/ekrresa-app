import { clsx, ClassValue } from 'clsx'
import { allPosts } from 'content-collections'
import { twMerge } from 'tailwind-merge'

export const IMAGE_BASE_URL = 'https://assets.ekrresa.com'

export const siteMetadata = {
  title: 'Ochuko Ekrresa',
  author: 'Ochuko Ekrresa',
  description:
    'Software Engineer sharing insights on software development, experiments, and lessons learned.',
  language: 'en',
  siteUrl: 'https://ekrresa.com',
  siteRepo: 'https://github.com/ekrresa/ekrresa.com',
  socialBanner: 'https://ekrresa.com/og-3.png',
  email: 'mailto:ekrresaochuko@gmail.com',
  github: 'https://github.com/ekrresa',
  twitter: 'https://twitter.com/ekrresa_',
  twitterHandle: '@ekrresa_',
  linkedin: 'https://www.linkedin.com/in/ekrresa/',
  locale: 'en-GB',
}

const ARTICLE_OG_TEMPLATE_VERSION = 2

function hashString(value: string) {
  let hash = 5381

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index)
  }

  return (hash >>> 0).toString(36)
}

export function getPageMetadata(requestUrl: string) {
  const articleSlug = new URL(requestUrl).pathname.match(/^\/articles\/([^/]+)\/?$/)?.[1]
  const article = articleSlug ? allPosts.find(post => post.slug === articleSlug) : undefined
  const pageTitle = article ? `${article.title} | ${siteMetadata.title}` : siteMetadata.title
  const pageDescription = article?.summary ?? siteMetadata.description
  const pageUrl = article
    ? `${siteMetadata.siteUrl}/articles/${article.slug}`
    : siteMetadata.siteUrl
  const socialImage = article
    ? `${siteMetadata.siteUrl}/articles/${article.slug}/og.png?v=${ARTICLE_OG_TEMPLATE_VERSION}-${hashString(article.title)}`
    : siteMetadata.socialBanner
  const socialImageAlt = article ? article.title : 'Ochuko Ekrresa — Software Engineer'

  return { article, pageTitle, pageDescription, pageUrl, socialImage, socialImageAlt }
}

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
