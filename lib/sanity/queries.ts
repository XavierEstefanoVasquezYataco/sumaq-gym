import { groq } from 'next-sanity'

/**
 * Consulta de Promociones Activas y Vigentes
 * Filtra por:
 * 1. activo == true
 * 2. Si fechaInicio está definida, debe ser menor o igual a now()
 * 3. Si fechaFin está definida, debe ser mayor o igual a now()
 */
export const PROMOTIONS_QUERY = groq`
  *[_type == "promocion" && activo == true && (!defined(fechaInicio) || dateTime(fechaInicio) <= dateTime(now())) && (!defined(fechaFin) || dateTime(fechaFin) >= dateTime(now()))] | order(_createdAt desc) {
    _id,
    titulo,
    descripcion,
    descuento,
    imagen,
    fechaInicio,
    fechaFin,
    activo,
    textoBoton,
    enlaceBoton
  }
`

export const CLASSES_QUERY = groq`
  *[_type == "clase"] | order(orden asc, _createdAt desc) {
    _id,
    nombre,
    descripcion,
    intensidad,
    duracion,
    horariosTexto,
    icono,
    orden,
    destacado
  }
`

export const PLANS_QUERY = groq`
  *[_type == "plan"] | order(orden asc, _createdAt desc) {
    _id,
    nombre,
    precio,
    periodo,
    descripcion,
    beneficios,
    destacado,
    orden,
    mensajeWhatsapp
  }
`

export const TRAINERS_QUERY = groq`
  *[_type == "entrenador" && activo == true] | order(orden asc, _createdAt desc) {
    _id,
    nombre,
    especialidad,
    bio,
    foto,
    activo,
    orden
  }
`

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonio" && activo == true] | order(_createdAt desc) {
    _id,
    nombre,
    comentario,
    calificacion,
    meta,
    activo
  }
`

export const SCHEDULE_QUERY = groq`
  *[_type == "horario"] | order(orden asc) {
    _id,
    dia,
    apertura,
    cierre,
    esConfirmado,
    nota,
    orden
  }
`

export const SETTINGS_QUERY = groq`
  *[_type == "ajustesGenerales"][0] {
    _id,
    nombreGimnasio,
    direccion,
    pisoReferencia,
    telefonoWhatsapp,
    mensajeWhatsappDefault,
    instagramUrl,
    facebookUrl,
    horarioLunesViernes,
    horarioSabado,
    horarioDomingo,
    heroTitulo,
    heroSubtitulo,
    avisoSuperior
  }
`

/**
 * Utilidad para formatear fechas en la zona horaria oficial de Lima (America/Lima)
 */
export function formatDateInLima(isoDate?: string): string {
  if (!isoDate) return ''
  try {
    const date = new Date(isoDate)
    return new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  } catch {
    return ''
  }
}
