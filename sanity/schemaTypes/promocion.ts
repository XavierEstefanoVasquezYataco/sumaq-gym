import { defineType, defineField } from 'sanity'

export const promocionType = defineType({
  name: 'promocion',
  title: 'Promoción u Oferta',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título de la Promoción',
      type: 'string',
      validation: (Rule) => Rule.required().error('El título es obligatorio'),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción de la Oferta',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descuento',
      title: 'Descuento o Etiqueta (Ej. 20% OFF, 2x1, Matrícula Gratis)',
      type: 'string',
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen Promocional (Opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'fechaInicio',
      title: 'Fecha y Hora de Inicio',
      type: 'datetime',
      description: 'Momento a partir del cual la promoción será visible en la web.',
    }),
    defineField({
      name: 'fechaFin',
      title: 'Fecha y Hora de Fin (Vigencia)',
      type: 'datetime',
      description: 'Límite de vigencia. Pasada esta fecha, la promoción dejará de mostrarse automáticamente.',
    }),
    defineField({
      name: 'activo',
      title: '¿Promoción Activa?',
      type: 'boolean',
      initialValue: true,
      description: 'Desactiva este switch para pausar la promoción de inmediato.',
    }),
    defineField({
      name: 'textoBoton',
      title: 'Texto del Botón',
      type: 'string',
      initialValue: 'Reclamar Promoción por WhatsApp',
    }),
    defineField({
      name: 'enlaceBoton',
      title: 'Enlace personalizado (Opcional)',
      type: 'url',
      description: 'Si se deja vacío, dirigirá automáticamente al WhatsApp oficial de Sumaq Center Gym.',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'descuento',
      media: 'imagen',
      activo: 'activo',
    },
    prepare({ title, subtitle, media, activo }) {
      return {
        title: `${activo ? '🟢' : '⚪'} ${title || 'Sin título'}`,
        subtitle: subtitle ? `Descuento: ${subtitle}` : 'Sin etiqueta de descuento',
        media,
      }
    },
  },
})
