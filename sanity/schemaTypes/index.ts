import { type SchemaTypeDefinition } from 'sanity'
import { promocionType } from './promocion'
import { claseType } from './clase'
import { planType } from './plan'
import { entrenadorType } from './entrenador'
import { testimonioType } from './testimonio'
import { horarioType } from './horario'
import { ajustesGeneralesType } from './ajustesGenerales'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ajustesGeneralesType,
    promocionType,
    claseType,
    planType,
    horarioType,
    entrenadorType,
    testimonioType,
  ],
}
