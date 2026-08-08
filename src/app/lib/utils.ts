import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const IMAGE_BASE_URL = 'https://assets.ekrresa.com'

export const siteMetadata = {
  title: 'Ochuko Ekrresa – Software Engineer',
  author: 'Ochuko Ekrresa',
  description:
    'Ochuko is a software engineer building products for the web. Sharing insights on software development, experiments, and lessons learned.',
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

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
