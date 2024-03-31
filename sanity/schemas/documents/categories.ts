import { FiUser } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categories',
  title: 'Categories',
  icon: FiUser,
  type: 'document',

  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
