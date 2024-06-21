import { FiMusic } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export const audioType = defineType({
  name: 'audio',
  type: 'object',
  icon: FiMusic,
  fields: [
    defineField({
      name: 'audioLabel',
      type: 'string',
    }),
    defineField({
      name: 'audioFile',
      type: 'file',
      options: { accept: 'audio/*' },
    }),
  ],
})
