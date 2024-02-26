import { FiUser, FiGlobe, FiUsers, FiMapPin } from 'react-icons/fi'
import { defineField, defineType, KeyedObject } from 'sanity'

import { i18n } from '../../../languages'

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
