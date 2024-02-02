import { FiAward, FiType, FiUsers } from 'react-icons/fi'
import {
  StructureResolver,
  DefaultDocumentNodeResolver,
} from 'sanity/structure'

import { i18n } from '../../languages'
import preview from './preview'
import references from './references'
import transifex from './transifex'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Custom document-level translation structure
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`Projects (${language.id.toLocaleUpperCase()})`)
                  .schemaType('project')

                  .child(
                    S.documentList()
                      .id(language.id)
                      .title(`${language.title} Projects`)
                      .schemaType('project')
                      .filter('_type == "project" && language == $language')
                      .params({ language: language.id })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('project-language', {
                          id: 'project-language',
                          language: language.id,
                        }),
                      ])
                      //if i remove this the canHandleIntent works correct for About but now it doesnt work for projects
                      .canHandleIntent((intentName, params) => {
                        if (intentName === 'edit') {
                          // return params?.language === language.id
                          return false
                        }

                        // Not an initial value template
                        if (!params.template) {
                          return false
                        }

                        // Template name structure example: "project-en"
                        const languageValue = params?.template?.split(`-`).pop()

                        return languageValue === language.id
                      }),
                  ),
              ),
              // I have only added this item so that search results when clicked will load this list
              // If the intent checker above could account for it, I'd remove this item
              S.divider(),
              S.listItem()
                .title(`All Projects`)
                .schemaType('project')
                .child(
                  S.documentList()
                    .id(`all-projects`)
                    .title(`All projects`)
                    .schemaType('project')
                    .filter('_type == "project"')
                    // Load this pane for existing `project` documents
                    // or new documents that aren't using an initial value template
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'edit' || params.template === `project`,
                    ),
                ),
            ]),
        ),
      // Field-level translations
      S.documentTypeListItem('portfolio').title('Portfolios'),
      S.divider(),
      S.listItem()
        .title('About pages')
        .child(
          S.list()
            .title('About pages')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`About page (${language.id.toLocaleUpperCase()})`)
                  .schemaType('aboutPage')

                  .child(
                    S.documentList()
                      .id(language.id)
                      .title(`${language.title} About`)
                      .schemaType('aboutPage')
                      .filter('_type == "aboutPage" && language == $language')
                      .params({ language: language.id })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('about-language', {
                          id: 'about-language',
                          language: language.id,
                        }),
                      ])
                      .canHandleIntent((intentName, params) => {
                        // TODO: Handle **existing** documents (like search results when clicked)
                        // to return `true` on the correct language list!
                        if (intentName === 'edit') {
                          // return params?.language === language.id
                          return false
                        }

                        // Not an initial value template
                        if (!params.template) {
                          return false
                        }

                        // Template name structure example: "project-en"
                        const languageValue = params?.template?.split(`-`).pop()

                        return languageValue === language.id
                      }),
                  ),
              ),
              // I have only added this item so that search results when clicked will load this list
              // If the intent checker above could account for it, I'd remove this item
              S.divider(),
              S.listItem()
                .title(`All About pages`)
                .schemaType('aboutPage')
                .child(
                  S.documentList()
                    .id(`all-abouts`)
                    .title(`All About pages`)
                    .schemaType('aboutPage')
                    .filter('_type == "aboutPage"')
                    // Load this pane for existing `project` documents
                    // or new documents that aren't using an initial value template
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'edit' ||
                        params.template === `aboutPage`,
                    ),
                ),
            ]),
        ),

      S.divider(),
      // Singleton, field-level translations
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, getClient },
) => {
  // const client = getClient({apiVersion: `2023-01-01`})

  switch (schemaType) {
    case 'portfolio':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
        transifex(S),
      ])
    case 'project':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
      ])
    case 'aboutPage':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
      ])
    case 'legal':
      return S.document().views([
        S.view.form(),
        // preview(S, client)
      ])
    default:
      return S.document()
  }
}
