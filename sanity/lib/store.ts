import 'server-only'
import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Configure the server client with additional settings
const serverClient = client.withConfig({
  token,
  stega: {
    // Enable stega for Vercel preview deployments
    enabled: process.env.VERCEL_ENV === 'preview',
  },
})

// Set the configured server client for queryStore
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn

// Extend loadQuery with advanced logic
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
  } = options

  let revalidate: NextFetchRequestConfig['revalidate'] = 0
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    // Safe to cache if not using CDN and tags are set
    revalidate = false
  } else if (usingCdn) {
    // Use CDN caching strategy
    revalidate = false
  }

  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
  })
}) satisfies typeof queryStore.loadQuery
