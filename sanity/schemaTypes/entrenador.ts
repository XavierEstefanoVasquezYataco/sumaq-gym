import { defineType, defineField } from 'sanity'

export const entrenadorType = defineType({
  name: 'entrenador',
  title: 'Entrenador / Staff Técnico',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Entrenador',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'especialidad',
      title: 'Especialidad (Ej. Musculación, Funcional, Biomecánica)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biografía o Perfil',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'foto',
      title: 'Fotografía Real (Opcional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'activo',
      title: '¿Activo en la web?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'especialidad',
      media: 'foto',
      activo: 'activo',
    },
    prepare({ title, subtitle, media, activo }) {
      return {
        title: `${activo ? '🟢' : '⚪'} ${title || 'Sin nombre'}`,
        subtitle: subtitle || 'Sin especialidad',
        media,
      }
    },
  },
})
