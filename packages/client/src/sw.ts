import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope & { skipWaiting: () => void }

precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

let allowlist: undefined | RegExp[]
if (import.meta.env.DEV) allowlist = [/^\/$/]

registerRoute(
  new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist })
)

self.skipWaiting()
clientsClaim()
