import { initClient, initClientNavigation } from 'rwsdk/client'
import 'core-js/actual/array/to-sorted'
import { articleImageTransitionName } from '@/app/lib/view-transitions'

// RedwoodSDK uses RSC RPC to emulate client side navigation.
// https://docs.rwsdk.com/guides/frontend/client-side-nav/
let currentPath = window.location.pathname
let completeViewTransitionUpdate: (() => void) | undefined
let activeArticleTransitionSlug: string | undefined
let viewTransitionSequence = 0

function isArticlePage(path: string) {
  return /^\/articles\/[^/]+\/?$/.test(path)
}

function getArticleSlug(path: string) {
  return path.match(/^\/articles\/([^/]+)\/?$/)?.[1]
}

function scopeArticleTransitionImages(slug: string) {
  document.querySelectorAll<HTMLElement>('[data-article-transition-slug]').forEach(element => {
    element.style.viewTransitionName =
      element.dataset.articleTransitionSlug === slug ? articleImageTransitionName(slug) : 'none'
  })
}

function restoreArticleTransitionImages() {
  document.querySelectorAll<HTMLElement>('[data-article-transition-slug]').forEach(element => {
    const slug = element.dataset.articleTransitionSlug

    if (slug) {
      element.style.viewTransitionName = articleImageTransitionName(slug)
    }
  })
}

function beginRouteViewTransition() {
  const nextPath = window.location.pathname
  const crossesArticleBoundary = isArticlePage(currentPath) !== isArticlePage(nextPath)
  const articleTransitionSlug = crossesArticleBoundary
    ? (getArticleSlug(nextPath) ?? getArticleSlug(currentPath))
    : undefined

  currentPath = nextPath

  if (
    !crossesArticleBoundary ||
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  activeArticleTransitionSlug = articleTransitionSlug

  document.activeViewTransition?.skipTransition()
  completeViewTransitionUpdate?.()

  if (activeArticleTransitionSlug) {
    scopeArticleTransitionImages(activeArticleTransitionSlug)
  }

  const transitionSequence = ++viewTransitionSequence
  let completeUpdate!: () => void
  const updateComplete = new Promise<void>(resolve => {
    completeUpdate = resolve
  })

  completeViewTransitionUpdate = completeUpdate

  const transition = document.startViewTransition(() => updateComplete)

  void transition.finished
    .catch(() => undefined)
    .finally(() => {
      if (viewTransitionSequence === transitionSequence) {
        restoreArticleTransitionImages()
        activeArticleTransitionSlug = undefined
        completeViewTransitionUpdate = undefined
      }
    })
}

const navigation = initClientNavigation({ onNavigate: beginRouteViewTransition })

function handleHydrated(...args: Parameters<typeof navigation.onHydrated>) {
  navigation.onHydrated(...args)

  if (activeArticleTransitionSlug) {
    scopeArticleTransitionImages(activeArticleTransitionSlug)
  }

  completeViewTransitionUpdate?.()
  completeViewTransitionUpdate = undefined
}

function handleResponse(response: Response) {
  const shouldHydrate = navigation.handleResponse(response)

  if (!shouldHydrate) {
    completeViewTransitionUpdate?.()
    completeViewTransitionUpdate = undefined
    restoreArticleTransitionImages()
    activeArticleTransitionSlug = undefined
  }

  return shouldHydrate
}

initClient({ handleResponse, onHydrated: handleHydrated })
