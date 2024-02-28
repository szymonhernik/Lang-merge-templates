import { FiUser, FiGlobe, FiUsers, FiMapPin } from 'react-icons/fi'
import { defineField, defineType, KeyedObject } from 'sanity'

import { i18n } from '../../../languages'

export default defineType({
  name: 'categories',
  title: 'Categories',
  icon: FiUser,
  type: 'document',

  fields: [
    // defineField({
    //   name: 'categoryName',
    //   title: 'Category Name',
    //   type: 'string',
    // }),
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: `categoryName.${i18n.base}`,
      titleNL: `categoryName.nl`,
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({ title, titleNL }: { title: string; titleNL: string }) {
      return {
        title,
        subtitle: titleNL,
      }
    },
  },
})
