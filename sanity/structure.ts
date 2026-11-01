import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido Sumaq Center Gym')
    .items([
      S.listItem()
        .title('Ajustes y Datos Generales')
        .id('ajustesGenerales')
        .child(
          S.document()
            .schemaType('ajustesGenerales')
            .documentId('ajustesGenerales')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'ajustesGenerales'
      ),
    ])
