import { defineType, defineField } from 'sanity'

export const ajustesGeneralesType = defineType({
  name: 'ajustesGenerales',
  title: 'Ajustes Generales del Gimnasio',
  type: 'document',
  fieldsets: [
    { name: 'contacto', title: 'Ubicación y Contacto' },
    { name: 'redes', title: 'Redes Sociales' },
    { name: 'horarios', title: 'Horarios de Atención' },
    { name: 'hero', title: 'Textos de la Portada (Hero)' },
  ],
  fields: [
    defineField({
      name: 'nombreGimnasio',
      title: 'Nombre del Gimnasio',
      type: 'string',
      initialValue: 'Sumaq Center Gym',
      fieldset: 'contacto',
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'string',
      initialValue: 'Jirón Callao 126, Cercado de Lima 15001',
      fieldset: 'contacto',
    }),
    defineField({
      name: 'pisoReferencia',
      title: 'Piso y Referencia',
      type: 'string',
      initialValue: '7.º piso (POR CONFIRMAR) • A pasos de la Plaza de Armas',
      fieldset: 'contacto',
    }),
    defineField({
      name: 'telefonoWhatsapp',
      title: 'Número de WhatsApp (Sin signos, ej. 933596324)',
      type: 'string',
      initialValue: '933 596 324',
      fieldset: 'contacto',
    }),
    defineField({
      name: 'mensajeWhatsappDefault',
      title: 'Mensaje Predeterminado de WhatsApp',
      type: 'string',
      initialValue: 'Hola Sumaq Center Gym, deseo consultar sobre las membresías y promociones.',
      fieldset: 'contacto',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Enlace de Instagram',
      type: 'url',
      initialValue: 'https://www.instagram.com/sumaqcentergym/',
      fieldset: 'redes',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Enlace de Facebook',
      type: 'url',
      initialValue: 'https://www.facebook.com/SumaqSumaqGYM/',
      fieldset: 'redes',
    }),
    defineField({
      name: 'horarioLunesViernes',
      title: 'Horario Lunes a Viernes',
      type: 'string',
      initialValue: '6:00 a. m. a 11:00 p. m.',
      fieldset: 'horarios',
    }),
    defineField({
      name: 'horarioSabado',
      title: 'Horario Sábado',
      type: 'string',
      initialValue: 'POR CONFIRMAR',
      fieldset: 'horarios',
    }),
    defineField({
      name: 'horarioDomingo',
      title: 'Horario Domingo y Feriados',
      type: 'string',
      initialValue: 'POR CONFIRMAR',
      fieldset: 'horarios',
    }),
    defineField({
      name: 'heroTitulo',
      title: 'Título del Hero',
      type: 'string',
      initialValue: 'Fuerza, Salud y Disciplina en el Corazón de Lima',
      fieldset: 'hero',
    }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Subtítulo del Hero',
      type: 'text',
      rows: 3,
      initialValue: 'Ubicados en Jirón Callao 126. Entrena en un espacio diseñado para tu progreso diario con el mejor horario del centro de Lima.',
      fieldset: 'hero',
    }),
    defineField({
      name: 'avisoSuperior',
      title: 'Aviso Superior o Noticia Destacada (Opcional)',
      type: 'string',
      description: 'Si se llena, aparecerá como una barra de anuncio superior.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: '⚙️ Configuración y Datos de Sumaq Center Gym',
        subtitle: 'Jr. Callao 126, Cercado de Lima',
      }
    },
  },
})
