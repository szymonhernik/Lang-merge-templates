import {
  FiAward,
  FiBook,
  FiGlobe,
  FiImage,
  FiUsers,
  FiCircle,
  FiFileText,
} from 'react-icons/fi'
import { defineType, defineField, Reference } from 'sanity'
import { SanityImageObjectStub } from '@sanity/asset-utils'
import CustomFiCircleIcon from '@/sanity-studio/components/CustomFiCircleIcon' // Import your custom icon component

import PortfolioMedia from '../../../sanity-studio/components/PortfolioMedia'
import { i18n } from '@/languages'

export default defineType({
  name: 'externalDoc',
  title: 'Seperate files',
  icon: FiFileText,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      description: 'This is a localized string field, stored in an object',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'File',
      description: 'This is a localized file field, stored in an object',
      type: 'localizedFile',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Type of file',
      description: 'Pick the format of your file',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'Sound', value: 'sound' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({ title }: { title: string }) {
      return {
        title,
      }
    },
  },
})
