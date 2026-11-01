import { client } from '@/sanity/lib/client'
import { isSanityConfigured } from '@/sanity/env'
import {
  PROMOTIONS_QUERY,
  CLASSES_QUERY,
  PLANS_QUERY,
  TRAINERS_QUERY,
  TESTIMONIALS_QUERY,
  SCHEDULE_QUERY,
  SETTINGS_QUERY,
} from './queries'
import type {
  Promocion,
  Clase,
  Plan,
  Entrenador,
  Testimonio,
  Horario,
  AjustesGenerales,
} from './types'

export { client }

/**
 * Obtener promociones activas y vigentes
 * Maneja errores retornando un arreglo vacío sin romper la app.
 */
export async function getPromotions(): Promise<Promocion[]> {
  if (!isSanityConfigured) return []
  try {
    const data = await client.fetch<Promocion[]>(PROMOTIONS_QUERY)
    return data || []
  } catch (error) {
    console.error('Error fetching promotions from Sanity:', error)
    return []
  }
}

export async function getClasses(): Promise<Clase[]> {
  if (!isSanityConfigured) return []
  try {
    const data = await client.fetch<Clase[]>(CLASSES_QUERY)
    return data || []
  } catch (error) {
    console.error('Error fetching classes from Sanity:', error)
    return []
  }
}

export async function getPlans(): Promise<Plan[]> {
  if (!isSanityConfigured) return []
  try {
    const data = await client.fetch<Plan[]>(PLANS_QUERY)
    return data || []
  } catch (error) {
    console.error('Error fetching plans from Sanity:', error)
    return []
  }
}

export async function getTrainers(): Promise<Entrenador[]> {
  if (!isSanityConfigured) return []
  try {
    const data = await client.fetch<Entrenador[]>(TRAINERS_QUERY)
    return data || []
  } catch (error) {
    console.error('Error fetching trainers from Sanity:', error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonio[]> {
  if (!isSanityConfigured) return []
  try {
    const data = await client.fetch<Testimonio[]>(TESTIMONIALS_QUERY)
    return data || []
  } catch (error) {
    console.error('Error fetching testimonials from Sanity:', error)
    return []
  }
}

export async function getSchedule(): Promise<Horario[]> {
  if (!isSanityConfigured) return []
  try {
    const data = await client.fetch<Horario[]>(SCHEDULE_QUERY)
    return data || []
  } catch (error) {
    console.error('Error fetching schedule from Sanity:', error)
    return []
  }
}

export async function getSettings(): Promise<AjustesGenerales | null> {
  if (!isSanityConfigured) return null
  try {
    const data = await client.fetch<AjustesGenerales | null>(SETTINGS_QUERY)
    return data || null
  } catch (error) {
    console.error('Error fetching settings from Sanity:', error)
    return null
  }
}
