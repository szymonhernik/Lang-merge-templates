import { defineConfig, isKeyedObject } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { languageFilter } from '@sanity/language-filter'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { muxInput } from 'sanity-plugin-mux-input'
import { media } from 'sanity-plugin-media'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'

import { structure, defaultDocumentNode } from '@/sanity-studio/structure'
import { schemaTypes } from '@/sanity/schemas'
import { i18n } from '@/languages'
import { enableUrl, locate } from '@/sanity-studio/presentation'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  name: 'default',
  title: 'NM web',
  apiVersion: apiVersion || '',
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: enableUrl,
        },
      },
    }),
    media(),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ['project', 'aboutPage', 'musicPage', 'contactPage'],
    }),
    internationalizedArray({
      languages: i18n.languages,
      defaultLanguages: [i18n.base],
      fieldTypes: ['string', 'text'],
    }),
    languageFilter({
      supportedLanguages: i18n.languages,
      defaultLanguages: [i18n.base],
      documentTypes: ['portfolio', 'externalDoc'],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Filter internationalized arrays
        if (
          enclosingType.jsonType === 'object' &&
          enclosingType.name.startsWith('internationalizedArray') &&
          'kind' in member
        ) {
          const language = isKeyedObject(member.field.path[1])
            ? member.field.path[1]._key
            : null

          return language ? selectedLanguageIds.includes(language) : false
        }

        // Filter internationalized objects
        // `localeString` must be registered as a custom schema type
        if (
          enclosingType.jsonType === 'object' &&
          enclosingType.name.startsWith('locale')
        ) {
          return selectedLanguageIds.includes(member.name)
        }

        return true
      },
    }),

    visionTool(),
    muxInput(),
  ],
  schema: {
    types: schemaTypes,

    templates: (prev) => {
      const prevFiltered = prev.filter(
        (template) =>
          template.id !== 'project' &&
          template.id !== 'aboutPage' &&
          template.id !== 'contactPage' &&
          template.id !== 'musicPage',
      )

      return [
        ...prevFiltered,
        {
          id: 'project-language',
          title: 'Project with Language',
          schemaType: 'project',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
        // New 'about-language' template
        {
          id: 'about-language',
          title: 'About with Language',
          schemaType: 'aboutPage',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
        {
          id: 'contact-language',
          title: 'Contact with Language',
          schemaType: 'contactPage',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
        {
          id: 'music-language',
          title: 'Music with Language',
          schemaType: 'musicPage',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
      ]
    },
  },
  studio: {},
  form: {
    components: {
      field: (props) => {
        return props.renderDefault(props)
      },
    },
  },
  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles.some(
      (role) => role.name === 'administrator',
    )

    if (isAdmin) {
      return prev
    }

    return prev.filter((tool) => tool.name !== 'vision')
  },
})
