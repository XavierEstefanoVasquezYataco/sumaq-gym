import { defineType, defineField } from 'sanity'

export const claseType = defineType({
  name: 'clase',
  title: 'Clase o Disciplina',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre de la Disciplina',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción breve',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'intensidad',
      title: 'Nivel de Intensidad',
      type: 'string',
      options: {
        list: [
          { title: 'Todos los niveles', value: 'Todos los niveles' },
          { title: 'Baja', value: 'Baja' },
          { title: 'Media', value: 'Media' },
          { title: 'Alta', value: 'Alta' },
        ],
      },
      initialValue: 'Todos los niveles',
    }),
    defineField({
      name: 'duracion',
      title: 'Duración aproximada (Ej. 50 min)',
      type: 'string',
    }),
    defineField({
      name: 'horariosTexto',
      title: 'Horarios o Días sugeridos',
      type: 'string',
      description: 'Ej. Lunes a Viernes continuo o Lun - Mié - Vie 7:00 pm',
    }),
    defineField({
      name: 'icono',
      title: 'Icono representativo',
      type: 'string',
      options: {
        list: [
          { title: 'Mancuerna / Fuerza', value: 'Dumbbell' },
          { title: 'Fuego / Cardio', value: 'Flame' },
          { title: 'Actividad / Funcional', value: 'Activity' },
          { title: 'Grupo / Comunidad', value: 'Users' },
        ],
      },
      initialValue: 'Dumbbell',
    }),
    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'destacado',
      title: '¿Destacar en portada?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'intensidad',
    },
  },
})
