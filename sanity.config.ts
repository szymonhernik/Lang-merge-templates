import { Card } from '@sanity/ui'
import { buildLegacyTheme, defineConfig, isKeyedObject } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { languageFilter } from '@sanity/language-filter'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'

import { structure, defaultDocumentNode } from '@/sanity-studio/structure'
import { schemaTypes } from '@/sanity/schemas'
import { i18n } from '@/languages'
import { enableUrl, locate } from '@/sanity-studio/presentation'

import Icon from '@/sanity-studio/components/Icon'
const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Narges Mohammadi'

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
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ['project', 'aboutPage'],
    }),
    internationalizedArray({
      languages: i18n.languages,
      defaultLanguages: [i18n.base],
      fieldTypes: ['string', 'text'],
    }),
    languageFilter({
      supportedLanguages: i18n.languages,
      defaultLanguages: [i18n.base],
      documentTypes: [`portfolio`],
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
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const prevFiltered = prev.filter(
        (template) => template.id !== 'project' && template.id !== 'aboutPage',
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
      ]
    },
  },
  studio: {
    components: {
      // navbar: (props) => <Card scheme="dark">{props.renderDefault(props)}</Card>,
    },
  },
  form: {
    components: {
      field: (props) => {
        // if (props.path.length === 1) {
        //   return (
        //     <div style={{border: '1px solid red', padding: 30}}>{props.renderDefault(props)}</div>
        //   )
        // }

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
