import { FiUser } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collaborator',
  title: 'Collaborator',
  icon: FiUser,
  type: 'document',

  fields: [
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
    }),

    defineField({
      name: 'collaboratorUrl',
      type: 'url',
      title: 'Collaborator portfolio url',
    }),
  ],
})
