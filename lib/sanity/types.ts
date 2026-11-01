export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Promocion {
  _id: string
  titulo: string
  descripcion: string
  descuento?: string
  imagen?: SanityImage
  fechaInicio?: string
  fechaFin?: string
  activo: boolean
  textoBoton?: string
  enlaceBoton?: string
}

export interface Clase {
  _id: string
  nombre: string
  descripcion?: string
  intensidad?: string
  duracion?: string
  horariosTexto?: string
  icono?: string
  orden?: number
  destacado?: boolean
}

export interface Plan {
  _id: string
  nombre: string
  precio: string
  periodo?: string
  descripcion?: string
  beneficios?: string[]
  destacado?: boolean
  orden?: number
  mensajeWhatsapp?: string
}

export interface Entrenador {
  _id: string
  nombre: string
  especialidad?: string
  bio?: string
  foto?: SanityImage
  activo: boolean
  orden?: number
}

export interface Testimonio {
  _id: string
  nombre: string
  comentario: string
  calificacion?: number
  meta?: string
  activo: boolean
}

export interface Horario {
  _id: string
  dia: string
  apertura?: string
  cierre?: string
  esConfirmado: boolean
  nota?: string
  orden?: number
}

export interface AjustesGenerales {
  _id?: string
  nombreGimnasio?: string
  direccion?: string
  pisoReferencia?: string
  telefonoWhatsapp?: string
  mensajeWhatsappDefault?: string
  instagramUrl?: string
  facebookUrl?: string
  horarioLunesViernes?: string
  horarioSabado?: string
  horarioDomingo?: string
  heroTitulo?: string
  heroSubtitulo?: string
  avisoSuperior?: string
}
