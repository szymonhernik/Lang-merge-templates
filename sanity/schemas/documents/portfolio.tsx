import {
  FiAward,
  FiBook,
  FiGlobe,
  FiImage,
  FiUsers,
  FiCircle,
} from 'react-icons/fi'
import { defineType, defineField, Reference } from 'sanity'
import { SanityImageObjectStub } from '@sanity/asset-utils'
import CustomFiCircleIcon from '@/sanity-studio/components/CustomFiCircleIcon' // Import your custom icon component

import { i18n } from '../../../languages'
import PortfolioMedia from '../../../sanity-studio/components/PortfolioMedia'

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
          options: {
            // Add filter options to only show projects where 'language' is 'en'
            filter: 'language == $lang',
            filterParams: { lang: 'en' },
          },
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
      titleNL: `title.nl`,
      projects: 'projects',
      image: 'image',
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({
      title,
      projects,
      image,
      titleNL,
    }: {
      title: string
      projects: Reference[]
      image: SanityImageObjectStub
      titleNL: string
    }) {
      console.log('projects ref: ', projects)

      const projectCount = projects?.length || 0
      const projectSubtitle = projectCount
        ? `${titleNL} (${projectCount} ${projectCount === 1 ? `project` : `projects`})`
        : 'No projects'

      return {
        title,
        subtitle: projectSubtitle,
        media: image ?? FiBook,
      }
    },
  },
})
