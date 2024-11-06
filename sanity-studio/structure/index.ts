import { FiUsers, FiAtSign, FiMusic, FiAlignLeft, FiGrid } from 'react-icons/fi'
import {
  StructureResolver,
  DefaultDocumentNodeResolver,
} from 'sanity/structure'

import { i18n } from '../../languages'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import { apiVersion } from '@/sanity/env'

export const structure: StructureResolver = (S, context) => {
  // Define the custom 'home' document list item
  const homeListItem = S.listItem()
    .title('Home')
    .icon(home.icon)
    .child(
      S.editor()
        .title('Home')
        .id(home.name)
        .schemaType(home.name)
        .documentId(home.name),
    )
  const settingsListItem = S.listItem()
    .title('Settings')
    .icon(settings.icon)
    .child(
      S.editor()
        .title('Settings')
        .id(settings.name)
        .schemaType(settings.name)
        .documentId(settings.name),
    )

  // Get the default list items, but filter out 'home' if it's there by default
  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      listItem.getId() !== home.name && listItem.getId() !== settings.name,
  )

  return S.list()
    .title('Content')
    .items([
      // Custom document-level translation structure
      //here
      homeListItem,
      settingsListItem,
      S.divider(),
      S.listItem()
        .title('About pages')
        .icon(FiAlignLeft)
        .child(
          S.list()
            .title('About pages')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`About page (${language.id.toLocaleUpperCase()})`)
                  .schemaType('aboutPage')
                  .icon(FiAlignLeft)
                  .child(
                    S.documentList()
                      .apiVersion(apiVersion)

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
                          return false
                        }
                        if (intentName === 'create') {
                          return true
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
            ]),
        ),

      S.listItem()
        .title('Music pages')
        .icon(FiMusic)
        .child(
          S.list()
            .title('Music pages')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`Music page (${language.id.toLocaleUpperCase()})`)
                  .schemaType('aboutPage')
                  .icon(FiMusic)
                  .child(
                    S.documentList()
                      .apiVersion(apiVersion)
                      .id(language.id)
                      .title(`${language.title} Music`)

                      .schemaType('musicPage')
                      .filter('_type == "musicPage" && language == $language')
                      .params({ language: language.id })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('music-language', {
                          id: 'music-language',
                          language: language.id,
                        }),
                      ])
                      .canHandleIntent((intentName, params) => {
                        // TODO: Handle **existing** documents (like search results when clicked)
                        // to return `true` on the correct language list!
                        if (intentName === 'edit') {
                          return false
                        }
                        if (intentName === 'create') {
                          return true
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
            ]),
        ),

      S.listItem()
        .title('Contact pages')
        .icon(FiAtSign)
        .child(
          S.list()
            .title('Contact pages')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`Contact page (${language.id.toLocaleUpperCase()})`)
                  .schemaType('contactPage')
                  .icon(FiAtSign)

                  .child(
                    S.documentList()
                      .apiVersion(apiVersion)

                      .id(language.id)
                      .title(`${language.title} Contact`)
                      .schemaType('contactPage')
                      .filter('_type == "contactPage" && language == $language')
                      .params({ language: language.id })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('contact-language', {
                          id: 'contact-language',
                          language: language.id,
                        }),
                      ])
                      .canHandleIntent((intentName, params) => {
                        // TODO: Handle **existing** documents (like search results when clicked)
                        // to return `true` on the correct language list!
                        if (intentName === 'edit') {
                          return false
                        }
                        if (intentName === 'create') {
                          return true
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
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Projects')
        .icon(FiGrid)
        .child(
          S.list()
            .title('Projects')
            .items([
              ...i18n.languages.map((language) =>
                S.listItem()
                  .title(`Projects (${language.id.toLocaleUpperCase()})`)
                  .schemaType('project')
                  .icon(FiGrid)
                  .child(
                    S.documentList()
                      .apiVersion(apiVersion)
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

                      .canHandleIntent((intentName, params) => {
                        if (intentName === 'edit') {
                          return false
                        }

                        if (intentName === 'create') {
                          return true
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
                    .apiVersion(apiVersion)
                    .id(`all-projects`)
                    .title(`All projects`)
                    .schemaType('project')
                    .filter('_type == "project"')
                    // Load this pane for existing `project` documents
                    // or new documents that aren't using an initial value template
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'edit' ||
                        intentName === 'create' ||
                        params.template === `project`,
                    ),
                ),
            ]),
        ),

      S.divider(),
      S.documentTypeListItem('collaborator')
        .title('Collaborators')
        .icon(FiUsers),
    ])
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  switch (schemaType) {
    case 'project':
      return S.document().views([S.view.form()])
    case 'aboutPage':
      return S.document().views([S.view.form()])
    case 'musicPage':
      return S.document().views([S.view.form()])

    default:
      return S.document()
  }
}
