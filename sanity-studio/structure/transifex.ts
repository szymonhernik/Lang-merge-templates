import { StructureBuilder, StructureResolver } from 'sanity/structure'
import {
  TranslationsTab,
  defaultFieldLevelConfig,
} from 'sanity-plugin-transifex'
import { DocumentDefinition } from 'sanity'

export default (S: StructureBuilder) =>
  S.view
    .component(TranslationsTab)
    .title('Transifex')
    .options(defaultFieldLevelConfig)

export const pageStructure = (
  typeDefArray: DocumentDefinition[],
): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        )
    })

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find((singleton) => singleton.name === listItem.getId()),
    )

    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultListItems])
  }
}
