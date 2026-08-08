import { initClient, initClientNavigation } from 'rwsdk/client'
import 'core-js/actual/array/to-sorted'

// RedwoodSDK uses RSC RPC to emulate client side navigation.
// https://docs.rwsdk.com/guides/frontend/client-side-nav/
let currentPath = window.location.pathname
let completeViewTransitionUpdate: (() => void) | undefined

function isArticlePage(path: string) {
  return /^\/articles\/[^/]+\/?$/.test(path)
}

function beginRouteViewTransition() {
  const nextPath = window.location.pathname
  const crossesArticleBoundary = isArticlePage(currentPath) !== isArticlePage(nextPath)

  currentPath = nextPath

  if (
    !crossesArticleBoundary ||
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  completeViewTransitionUpdate?.()

  let completeUpdate!: () => void
  const updateComplete = new Promise<void>(resolve => {
    completeUpdate = resolve
  })

  completeViewTransitionUpdate = completeUpdate

  const transition = document.startViewTransition(() => updateComplete)

  void transition.finished
    .catch(() => undefined)
    .finally(() => {
      if (completeViewTransitionUpdate === completeUpdate) {
        completeViewTransitionUpdate = undefined
      }
    })
}

const navigation = initClientNavigation({ onNavigate: beginRouteViewTransition })

function handleHydrated(...args: Parameters<typeof navigation.onHydrated>) {
  navigation.onHydrated(...args)
  completeViewTransitionUpdate?.()
  completeViewTransitionUpdate = undefined
}

function handleResponse(response: Response) {
  const shouldHydrate = navigation.handleResponse(response)

  if (!shouldHydrate) {
    completeViewTransitionUpdate?.()
    completeViewTransitionUpdate = undefined
  }

  return shouldHydrate
}

initClient({ handleResponse, onHydrated: handleHydrated })
