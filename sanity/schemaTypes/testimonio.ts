import { defineType, defineField } from 'sanity'

export const testimonioType = defineType({
  name: 'testimonio',
  title: 'Testimonio / Reseña',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre de la Persona',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'comentario',
      title: 'Comentario o Experiencia',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'calificacion',
      title: 'Calificación (1 a 5 estrellas)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'meta',
      title: 'Objetivo o Logro (Ej. Aumento de masa muscular, Constancia)',
      type: 'string',
    }),
    defineField({
      name: 'activo',
      title: '¿Publicar en la web?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'meta',
      calificacion: 'calificacion',
      activo: 'activo',
    },
    prepare({ title, subtitle, calificacion, activo }) {
      const stars = '⭐'.repeat(calificacion || 5)
      return {
        title: `${activo ? '🟢' : '⚪'} ${title || 'Sin nombre'}`,
        subtitle: `${stars} ${subtitle ? `• ${subtitle}` : ''}`,
      }
    },
  },
})
