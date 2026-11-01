import { defineType, defineField } from 'sanity'

export const planType = defineType({
  name: 'plan',
  title: 'Plan de Membresía',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre del Plan (Ej. Plan Mensual, Plan Trimestral)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio (Ej. S/. 120 o POR CONFIRMAR)',
      type: 'string',
      initialValue: 'POR CONFIRMAR',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'periodo',
      title: 'Período (Ej. Por mes, Por 3 meses, Pago anual)',
      type: 'string',
      initialValue: 'Por mes',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción breve',
      type: 'string',
    }),
    defineField({
      name: 'beneficios',
      title: 'Lista de beneficios incluidos',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'destacado',
      title: '¿Marcar como Más Recomendado?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'mensajeWhatsapp',
      title: 'Mensaje personalizado para WhatsApp al consultar este plan',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'precio',
      destacado: 'destacado',
    },
    prepare({ title, subtitle, destacado }) {
      return {
        title: `${destacado ? '⭐ ' : ''}${title || 'Sin nombre'}`,
        subtitle: subtitle ? `Precio: ${subtitle}` : 'Precio no especificado',
      }
    },
  },
})
