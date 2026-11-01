export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Si falta el ID del proyecto, se usa un marcador para que el build no falle.
// Las consultas a Sanity se omiten y la app usa sus datos de respaldo.
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
)

if (!isSanityConfigured) {
  console.warn(
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID. Sanity content is disabled.'
  )
}

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'not-configured'
