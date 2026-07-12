'use client'

import { cx } from '../lib/utils'
import { ArrowLeftIcon } from '@phosphor-icons/react'

interface BackLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <a
      href={href}
      className={cx(
        'inline-flex items-center gap-2 border-be border-ui-line pbe-2 text-xs font-medium tracking-[0.22em] text-ui-muted uppercase transition hover:border-ui-accent hover:text-ui-ink',
        className
      )}
    >
      <ArrowLeftIcon size={16} />

      {children}
    </a>
  )
}
