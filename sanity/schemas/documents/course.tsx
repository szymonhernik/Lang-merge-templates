import { FiAward, FiBook, FiGlobe, FiImage, FiUsers } from 'react-icons/fi'
import { defineType, defineField, Reference } from 'sanity'
import { SanityImageObjectStub } from '@sanity/asset-utils'

import { i18n } from '../../../languages'
import CourseMedia from '../../../sanity-studio/components/CourseMedia'

export default defineType({
  name: 'course',
  title: 'Project groups (homepage)',
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
      projects: 'projects',
      image: 'image',
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({
      title,
      projects,
      image,
    }: {
      title: string
      projects: Reference[]

      image: SanityImageObjectStub
    }) {
      const projectCount = projects?.length || 0
      const projectSubtitle = projectCount
        ? `${projectCount} ${projectCount === 1 ? `project` : `projects`}`
        : 'No projects'

      return {
        title,
        subtitle: projectSubtitle,
        media: image ?? FiBook,
      }
    },
  },
})
