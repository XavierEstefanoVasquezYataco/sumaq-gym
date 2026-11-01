import { defineType, defineField } from 'sanity'

export const horarioType = defineType({
  name: 'horario',
  title: 'Horario de Atención',
  type: 'document',
  fields: [
    defineField({
      name: 'dia',
      title: 'Día o Franja (Ej. Lunes a Viernes, Sábados, Domingos)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'apertura',
      title: 'Hora de Apertura (Ej. 6:00 a. m.)',
      type: 'string',
    }),
    defineField({
      name: 'cierre',
      title: 'Hora de Cierre (Ej. 11:00 p. m.)',
      type: 'string',
    }),
    defineField({
      name: 'esConfirmado',
      title: '¿Horario Oficial Confirmado?',
      type: 'boolean',
      initialValue: true,
      description: 'Si está desactivado, se mostrará con el badge [POR CONFIRMAR].',
    }),
    defineField({
      name: 'nota',
      title: 'Nota o Detalle Adicional',
      type: 'string',
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
      title: 'dia',
      apertura: 'apertura',
      cierre: 'cierre',
      confirmado: 'esConfirmado',
    },
    prepare({ title, apertura, cierre, confirmado }) {
      const hours = apertura && cierre ? `${apertura} – ${cierre}` : 'Horario no definido'
      return {
        title: `${confirmado ? '✓' : '⚠️'} ${title || 'Sin día'}`,
        subtitle: hours,
      }
    },
  },
})
