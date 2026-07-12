'use client'

import { Briefcase, House, Menu, MoonStar, Newspaper, X, type UiIcon } from './ui-icons'
import * as React from 'react'

import { cx } from '../lib/utils'
import { ThemeToggle } from './ThemeToggle'

interface MobileMenuItem {
  label: string
  href: string
  icon: UiIcon
  isActive(path: string): boolean
}

interface MobileFabMenuProps {
  path: string
}

function isHomePath(path: string) {
  return path === '/'
}

function isArticlesPath(path: string) {
  return path === '/articles' || path.startsWith('/articles/')
}

function isProjectsPath() {
  return false
}

const mobileMenuItems: MobileMenuItem[] = [
  { label: 'Home', href: '/', icon: House, isActive: isHomePath },
  { label: 'Articles', href: '/articles', icon: Newspaper, isActive: isArticlesPath },
  { label: 'Projects', href: '/#projects', icon: Briefcase, isActive: isProjectsPath },
]

export function MobileFabMenu({ path }: MobileFabMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMenuMounted, setIsMenuMounted] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const closeTimeoutRef = React.useRef<number | undefined>(undefined)
  const lastScrollYRef = React.useRef(0)
  const openTimeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    const nextScrollY = window.scrollY
    lastScrollYRef.current = nextScrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollYRef.current

      if (currentScrollY < 24) {
        setIsVisible(true)
      } else if (scrollDelta > 8) {
        setIsVisible(false)
      } else if (scrollDelta < -8) {
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  React.useEffect(() => {
    if (isOpen || !isMenuMounted) {
      return
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuMounted(false)
    }, 520)

    return () => {
      window.clearTimeout(closeTimeoutRef.current)
    }
  }, [isMenuMounted, isOpen])

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== undefined) {
        window.clearTimeout(closeTimeoutRef.current)
      }

      if (openTimeoutRef.current !== undefined) {
        window.clearTimeout(openTimeoutRef.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    setIsVisible(true)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  const closeMenu = () => {
    if (openTimeoutRef.current !== undefined) {
      window.clearTimeout(openTimeoutRef.current)
    }

    setIsOpen(false)
  }

  const openMenu = () => {
    window.clearTimeout(closeTimeoutRef.current)
    setIsVisible(true)
    setIsMenuMounted(true)

    openTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(true)
    }, 20)
  }

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu()
      return
    }

    openMenu()
  }

  const isFabVisible = isVisible || isOpen
  const getTransitionDelay = (step: number) => {
    return isOpen ? `${step}ms` : '0ms'
  }

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        aria-controls="mobile-site-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className={`
          fixed inset-e-6 inset-be-[calc(env(safe-area-inset-bottom,0)+4rem)] z-40 inline-flex items-center justify-center
          rounded-full border border-ui-line bg-ui-surface-strong text-ui-ink shadow-ui-float
          backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
          block-14 inline-14
          motion-reduce:transition-none
          ${
            isFabVisible
              ? 'translate-y-0 scale-100 opacity-100'
              : `pointer-events-none translate-y-[calc(100%+1.75rem)] scale-90 opacity-0`
          }
          ${isOpen ? 'shadow-ui-float-lg' : ''}
        `}
        onClick={toggleMenu}
        type="button"
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        <span
          className={`
            absolute -inset-3 rounded-full bg-ui-accent/18 blur-xl transition-all duration-700
            ease-[cubic-bezier(0.19,1,0.22,1)]
            dark:bg-ui-accent/24
            ${isOpen ? 'scale-100 opacity-100' : 'scale-70 opacity-0'}
          `}
        />
        <span
          className={`
            absolute inset-0 rounded-full bg-ui-accent/12 transition-all duration-700
            ease-[cubic-bezier(0.19,1,0.22,1)]
            dark:bg-ui-accent/18
            ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
          `}
        />
        <span
          className={`
            relative transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
            ${isOpen ? 'scale-[0.88] rotate-90' : 'scale-100 rotate-0'}
          `}
        >
          {isOpen ? (
            <X className="block-5 inline-5" strokeWidth={2.2} />
          ) : (
            <Menu className="block-5 inline-5" strokeWidth={2.2} />
          )}
        </span>
      </button>

      {isMenuMounted ? (
        <>
          <div
            className={`
              fixed inset-0 z-30 bg-ui-canvas/28 backdrop-blur-[6px] transition-all duration-500
              ease-[cubic-bezier(0.19,1,0.22,1)]
              motion-reduce:transition-none
              ${isOpen ? 'pointer-events-auto opacity-100' : `pointer-events-none opacity-0`}
            `}
            onClick={closeMenu}
          />

          <nav
            id="mobile-site-menu"
            aria-hidden={!isOpen}
            className={`
              fixed inset-e-6 inset-be-[calc(env(safe-area-inset-bottom,0)+8.5rem)] z-35
              origin-bottom-right overflow-hidden rounded-4xl border border-ui-line
              bg-ui-surface-strong p-3 shadow-ui-overlay ring-1
              ring-ui-surface-strong backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
              inline-[min(calc(100vw-3rem),22rem)]
              motion-reduce:transition-none
              dark:ring-ui-line
              ${
                isOpen
                  ? 'translate-y-0 scale-100 rotate-0 opacity-100'
                  : `pointer-events-none translate-y-10 scale-[0.9] rotate-2 opacity-0`
              }
            `}
          >
            <div
              className={`
                pointer-events-none absolute -inset-e-10 -inset-bs-10 rounded-full bg-ui-accent/16 blur-3xl transition-all
                duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] block-32 inline-32
                dark:bg-ui-accent/18
                ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
              `}
            />
            <div
              className={`
                pointer-events-none absolute inset-s-2 -inset-be-14 rounded-full bg-ui-surface-strong blur-3xl
                transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] block-28
                inline-28
                dark:bg-ui-accent/10
                ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
              `}
            />
            <div className="space-y-3">
              {mobileMenuItems.map((item, index) => {
                const active = item.isActive(path)

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    style={{ transitionDelay: getTransitionDelay(80 + index * 70) }}
                    className={cx(
                      'group flex items-center justify-between rounded-2xl border border-ui-line bg-ui-surface px-5 py-4 transition hover:border-ui-line hover:bg-ui-nav-surface',
                      'duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]',
                      {
                        'border border-ui-line bg-ui-nav-surface text-ui-ink': active,
                        'translate-y-0 scale-100 opacity-100': isOpen,
                        'translate-y-4 scale-[0.98] opacity-0': !isOpen,
                      }
                    )}
                    onClick={closeMenu}
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

            <div
              style={{ transitionDelay: getTransitionDelay(320) }}
              className={`
                relative mbs-3 rounded-[1.4rem] border border-ui-line bg-ui-surface px-4 py-3
                transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                ${isOpen ? 'translate-y-0 opacity-100' : `translate-y-4 scale-[0.98] opacity-0`}
              `}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span
                    className="
                      inline-flex items-center justify-center rounded-full border border-ui-line bg-ui-surface
                      text-ui-muted block-10 inline-10
                    "
                  >
                    <MoonStar className="block-4 inline-4" strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ui-ink">Theme</span>
                    <span className="block text-xs text-ui-muted">Toggle light or dark</span>
                  </span>
                </span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  )
}
