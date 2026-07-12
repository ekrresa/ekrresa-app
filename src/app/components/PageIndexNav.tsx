'use client'

import { pageIndexItems } from '../lib/nav'
import { useLocationHash } from '../lib/use-location-hash'
import { cx } from '../lib/utils'

export function PageIndexNav({ path }: { path: string }) {
  const hash = useLocationHash()

  return (
    <div className="mbs-6 space-y-3">
      {pageIndexItems.map(item => {
        const active = item.isActive(path, hash)

        return (
          <a
            key={item.label}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cx(
              'group flex items-center justify-between rounded-2xl border border-ui-line bg-ui-surface px-5 py-4 transition hover:border-ui-line hover:bg-ui-nav-surface',
              {
                'border border-ui-line bg-ui-nav-surface text-ui-ink': active,
              }
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cx(
                  'inline-flex items-center justify-center rounded-full border-ui-line bg-ui-surface text-ui-muted transition block-9 inline-9 group-hover:border-ui-accent/35 group-hover:bg-transparent group-hover:text-ui-ink',
                  {
                    'border-ui-accent/35 bg-transparent text-ui-ink': active,
                  }
                )}
              >
                <item.icon size={16} strokeWidth={1.8} />
              </span>
              <span className="block text-base font-medium text-ui-ink">{item.label}</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}
