'use client'

import { Briefcase, House, Menu, MoonStar, Newspaper, X, type LucideIcon } from 'lucide-react'
import * as React from 'react'

import { ThemeToggle } from './ThemeToggle'

interface MobileMenuItem {
  label: string
  href: string
  icon: LucideIcon
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
          fixed right-6 bottom-[calc(env(safe-area-inset-bottom,0)+4rem)] z-40 inline-flex size-14
          items-center justify-center rounded-full border border-ui-line bg-ui-surface-strong
          text-ui-ink shadow-ui-float backdrop-blur-xl transition-all
          duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
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
            <X className="size-5" strokeWidth={2.2} />
          ) : (
            <Menu className="size-5" strokeWidth={2.2} />
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
              fixed right-6 bottom-[calc(env(safe-area-inset-bottom,0)+8.5rem)] z-35
              w-[min(calc(100vw-3rem),22rem)] origin-bottom-right overflow-hidden rounded-4xl border
              border-ui-line bg-ui-surface-strong p-3 shadow-ui-overlay
              ring-1 ring-ui-surface-strong backdrop-blur-2xl transition-all duration-500
              ease-[cubic-bezier(0.19,1,0.22,1)]
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
                pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-ui-accent/16
                blur-3xl transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                dark:bg-ui-accent/18
                ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
              `}
            />
            <div
              className={`
                pointer-events-none absolute -bottom-14 left-2 size-28 rounded-full
                bg-ui-surface-strong blur-3xl transition-all duration-700
                ease-[cubic-bezier(0.19,1,0.22,1)]
                dark:bg-ui-accent/10
                ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
              `}
            />
            <div className="space-y-2">
              {mobileMenuItems.map((item, index) => {
                const active = item.isActive(path)

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    style={{ transitionDelay: getTransitionDelay(80 + index * 70) }}
                    className={`
                      group relative flex items-center justify-between rounded-[1.4rem] border px-4
                      py-3.5 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                      ${
                        active
                          ? `
                            border-ui-accent/28 bg-ui-accent/10 text-ui-ink
                            shadow-ui-md
                          `
                          : `
                            border-ui-line bg-ui-surface text-ui-ink
                            hover:-translate-y-0.5 hover:border-ui-accent/28 hover:bg-ui-accent/10
                          `
                      }
                      ${
                        isOpen
                          ? 'translate-y-0 scale-100 opacity-100'
                          : `translate-y-4 scale-[0.98] opacity-0`
                      }
                    `}
                    onClick={closeMenu}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`
                          inline-flex size-10 items-center justify-center rounded-full border
                          transition
                          ${
                            active
                              ? `
                                border-ui-accent/35 bg-ui-accent/16 text-ui-ink
                              `
                              : `
                                border-ui-line bg-ui-surface text-ui-muted
                                group-hover:border-ui-accent/35 group-hover:bg-ui-accent/14
                                group-hover:text-ui-ink
                              `
                          }
                        `}
                      >
                        <item.icon className="size-4" strokeWidth={1.9} />
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </span>
                  </a>
                )
              })}
            </div>

            <div
              style={{ transitionDelay: getTransitionDelay(320) }}
              className={`
                relative mt-3 rounded-[1.4rem] border border-ui-line bg-ui-surface px-4 py-3
                transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                ${isOpen ? 'translate-y-0 opacity-100' : `translate-y-4 scale-[0.98] opacity-0`}
              `}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span
                    className="
                      inline-flex size-10 items-center justify-center rounded-full border
                      border-ui-line bg-ui-surface text-ui-muted
                    "
                  >
                    <MoonStar className="size-4" strokeWidth={1.9} />
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
