'use client'

import { cx, siteMetadata } from '@/app/lib/utils'
import { GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react'

const socialLinks = [
  { href: siteMetadata.github, label: 'GitHub', icon: <GithubLogoIcon size={18} /> },
  { href: siteMetadata.linkedin, label: 'LinkedIn', icon: <LinkedinLogoIcon size={18} /> },
  { href: siteMetadata.twitter, label: 'Twitter', icon: <XLogoIcon size={18} /> },
]

interface SocialLinksProps {
  className?: string
}

export default function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cx('mbs-6 flex items-center justify-center gap-4', className)}>
      {socialLinks.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="
            inline-flex items-center justify-center rounded-xl border border-ui-line bg-ui-surface
            text-ui-muted transition block-10 inline-10 hover:border-ui-accent hover:text-ui-accent
          "
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}
