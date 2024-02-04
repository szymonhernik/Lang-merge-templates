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
      name: 'i18n',
      title: 'Localised',
      icon: FiGlobe,
      default: true,
    },
    {
      name: 'presenters',
      title: 'Presenters',
      icon: FiUsers,
    },
    {
      name: 'lessons',
      title: 'Lessons',
      icon: FiAward,
    },
    {
      name: 'media',
      title: 'Media',
      icon: FiImage,
    },
  ],
  fields: [
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
      name: 'lessons',
      group: 'lessons',
      type: 'array',
      of: [
        defineField({
          name: 'lesson',
          title: 'Lesson',
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
      validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: ['media'],
    }),
  ],
})
