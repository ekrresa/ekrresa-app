'use client'

import { ArrowRightIcon } from '@phosphor-icons/react'
import { cx } from '../lib/utils'

interface ForwardLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function ForwardLink({ href, children, className }: ForwardLinkProps) {
  return (
    <a
      href={href}
      className={cx(
        'group inline-flex items-center gap-1 text-sm font-medium text-ui-muted transition hover:text-ui-accent',
        className
      )}
    >
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
        size={16}
      />
    </a>
  )
}
