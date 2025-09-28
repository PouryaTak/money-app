const CACHE_NAME = "money-app-v1"
const urlsToCache = [
    "/",
    "/manifest.json",
    "/icon-192x192.png",
    "/icon-256x256.png",
    "/icon-384x384.png",
    "/icon-512x512.png",
    "/logo-text.png",
    "/wallet.svg",
    // Add other static assets as needed
]

// Install event - cache resources
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache")
                return cache.addAll(urlsToCache)
            })
            .catch((error) => {
                console.error("Failed to cache resources:", error)
            })
    )
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
    // Skip non-GET requests
    if (event.request.method !== "GET") {
        return
    }

    // Skip API requests and external resources
    if (
        event.request.url.includes("/api/") ||
        event.request.url.includes("googleusercontent.com") ||
        event.request.url.includes("githubusercontent.com")
    ) {
        return
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached version or fetch from network
            if (response) {
                return response
            }

            return fetch(event.request)
                .then((response) => {
                    // Don't cache if not a valid response
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response
                    }

                    // Clone the response
                    const responseToCache = response.clone()

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache)
                    })

                    return response
                })
                .catch(() => {
                    // Return offline page for navigation requests
                    if (event.request.destination === "document") {
                        return caches.match("/")
                    }
                })
        })
    )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deleting old cache:", cacheName)
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

// Handle background sync for offline transactions
self.addEventListener("sync", (event) => {
    if (event.tag === "background-sync") {
        event.waitUntil(
            // Handle offline transaction sync
            console.log("Background sync triggered")
        )
    }
})

// Handle push notifications (for future use)
self.addEventListener("push", (event) => {
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: "/icon-192x192.png",
            badge: "/icon-192x192.png",
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
            },
        }

        event.waitUntil(self.registration.showNotification(data.title, options))
    }
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
    event.notification.close()

    event.waitUntil(clients.openWindow("/"))
})
