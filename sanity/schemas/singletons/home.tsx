import { FiAward, FiBook, FiGlobe, FiImage, FiUsers } from 'react-icons/fi'
import { defineType, defineField, Reference } from 'sanity'
import { SanityImageObjectStub } from '@sanity/asset-utils'

import { i18n } from '../../../languages'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'home',
  title: 'Homepage',
  icon: HomeIcon,
  type: 'document',
  groups: [
    {
      name: 'showcaseHome',
      title: 'Showcase on Homepage',
      icon: FiAward,
    },
    {
      name: 'i18n',
      title: 'Localised',
      icon: FiGlobe,
    },
    {
      name: 'media',
      title: 'Media',
      icon: FiImage,
    },
  ],
  fields: [
    defineField({
      name: 'showcaseHome',
      group: 'showcaseHome',
      type: 'array',
      of: [
        defineField({
          name: 'showcasedProjects',
          title: 'Projects',
          type: 'reference',
          to: [{ type: 'project' }],
          options: {
            // Add filter options to only show projects where 'language' is 'en'
            filter: `(_type == 'project' && language == $lang && !defined(linkedFile))`,
            // filter: 'language == $lang',
            filterParams: { lang: 'en' },
          },
        }),
      ],
      validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
    defineField({
      name: 'text',
      title: 'SEO texts',
      type: 'localizedText',
      group: ['i18n'],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      group: ['media'],
    }),
  ],
})
