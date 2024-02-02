import { FiAward, FiBook, FiGlobe, FiImage, FiUsers } from 'react-icons/fi'
import { defineType, defineField, Reference } from 'sanity'
import { SanityImageObjectStub } from '@sanity/asset-utils'

import { i18n } from '../../../languages'
import CourseMedia from '../../../sanity-studio/components/CourseMedia'

export default defineType({
  name: 'course',
  title: 'Projects Groups listed on Homepage',
  icon: FiBook,
  type: 'document',
  groups: [
    {
      name: 'i18n',
      title: 'Localised',
      icon: FiGlobe,
      default: true,
    },
    {
      name: 'lessons',
      title: 'Projects',
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
          name: 'project',
          title: 'Project',
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
  preview: {
    select: {
      title: `title.${i18n.base}`,
      lessons: 'lessons',
      image: 'image',
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({
      title,
      lessons,
      image,
    }: {
      title: string
      lessons: Reference[]

      image: SanityImageObjectStub
    }) {
      const lessonCount = lessons?.length || 0
      const lessonSubtitle = lessonCount
        ? `${lessonCount} ${lessonCount === 1 ? `project` : `lessons`}`
        : 'No lessons'

      return {
        title,
        subtitle: lessonSubtitle,
        media: image ?? FiBook,
      }
    },
  },
})
