import { FiBook, FiGlobe, FiImage } from 'react-icons/fi'
import { defineType, defineField, Reference } from 'sanity'

import { i18n } from '../../../languages'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio project',
  icon: FiBook,
  type: 'document',
  groups: [
    {
      name: 'i18n',
      title: 'Localised',
      icon: FiGlobe,
    },
    {
      name: 'projects',
      title: 'Projects',
    },
    {
      name: 'media',
      title: 'Media',
      icon: FiImage,
    },
  ],
  fields: [
    orderRankField({ type: 'portfolio', newItemPosition: 'before' }),

    defineField({
      name: 'title',
      description: 'This is a localized string field, stored in an object',
      type: 'localizedString',
      group: ['i18n'],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'localizedSlug',
      group: ['i18n'],
      validation: (Rule) =>
        Rule.required().error(
          'A slug is required to generate a page on the website',
        ),
    }),

    defineField({
      name: 'projects',
      group: 'projects',
      type: 'array',
      of: [
        defineField({
          name: 'project',
          title: 'Project',
          type: 'reference',
          weak: true,
          to: [{ type: 'project' }],
          options: {
            // Add filter options to only show projects where 'language' is 'en'
            // filter: `(_type == 'project' && language == $lang) || _type == 'externalDoc'`,
            filter: 'language == $lang',
            filterParams: { lang: 'en' },
          },
        }),
      ],
      // validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
      titleNL: `title.nl`,
      projects: 'projects',
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({
      title,
      projects,

      titleNL,
    }: {
      title: string
      projects: Reference[]

      titleNL: string
    }) {
      const projectCount = projects?.length || 0
      const projectSubtitle = projectCount
        ? `${titleNL} (${projectCount} ${projectCount === 1 ? `project` : `projects`})`
        : 'No projects'

      return {
        title,
        subtitle: projectSubtitle,
        media: FiBook,
      }
    },
  },
})
